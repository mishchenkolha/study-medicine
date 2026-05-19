import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type ConfirmPaymentBody = {
  stripeSessionId?: string;
};

export default () => ({
  async confirmPayment(body: ConfirmPaymentBody) {
    const { stripeSessionId } = body;

    // ====================
    // VALIDATION
    // ====================

    if (!stripeSessionId) {
      throw new Error('Missing stripeSessionId');
    }

    // ====================
    // VERIFY STRIPE SESSION
    // ====================

    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    // ====================
    // VERIFY PAYMENT STATUS
    // ====================

    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }

    // ====================
    // VERIFY METADATA
    // ====================

    const userId = Number(session.metadata?.userId);

    const slug = session.metadata?.slug ?? '';

    if (!userId || !slug) {
      throw new Error('Invalid metadata');
    }

    // ====================
    // DUPLICATE PROTECTION
    // ====================

    const existingTransaction = await strapi
      .documents('api::user-transaction.user-transaction')
      .findFirst({
        filters: {
          transaction_id: stripeSessionId,
        },
      });

    // webhook retry safe
    if (existingTransaction) {
      return {
        success: true,
        duplicated: true,
      };
    }

    // ====================
    // VERIFY USER
    // ====================

    const users = await strapi
      .documents('plugin::users-permissions.user')
      .findMany({
        filters: {
          id: userId,
        },
      });

    const user = users?.[0];

    if (!user) {
      throw new Error('User not found');
    }

    // ====================
    // VERIFY COURSE
    // ====================

    const courses = await strapi.documents('api::course.course').findMany({
      filters: {
        slug,
      },
    });

    // Оскільки slug зазвичай унікальний, беремо перший елемент масиву
    const course = courses.length > 0 ? courses[0] : null;

    if (!course) {
      throw new Error('Course not found');
    }

    // ====================
    // VERIFY AMOUNT
    // ====================

    const stripeAmount = (session.amount_total || 0) / 100;

    if (!stripeAmount) {
      throw new Error('Invalid payment amount');
    }

    // ====================
    // CREATE TRANSACTION
    // ====================

    await strapi.documents('api::user-transaction.user-transaction').create({
      status: 'published',
      data: {
        transaction_id: stripeSessionId,
        payment_status: 'paid',
        amount: stripeAmount,
        user: userId,
        course: course.id,
      },
    });

    // ====================
    // USER COURSES RECORD
    // ====================

    const userCoursesRecords = await strapi
      .documents('api::user-course.user-course')
      .findMany({
        filters: {
          user: {
            id: userId,
          },
        },

        populate: {
          courses: true,
        },
      });

    const existingRecord = userCoursesRecords?.[0];

    // ====================
    // FIRST PURCHASE
    // ====================

    if (!existingRecord) {
      await strapi.documents('api::user-course.user-course').create({
        status: 'published',
        data: {
          user: userId,
          courses: [course.id],
        },
      });
    } else {
      // ====================
      // PREVENT DUPLICATES
      // ====================

      const existingCourses =
        existingRecord.courses?.map((course) => course.id) || [];

      const alreadyHasCourse = existingCourses.includes(course.id);

      // ====================
      // ADD NEW COURSE
      // ====================

      if (!alreadyHasCourse) {
        const mergedCourses = [...new Set([...existingCourses, course.id])];

        await strapi.documents('api::user-course.user-course').update({
          documentId: existingRecord.documentId,
          status: 'published',
          data: {
            courses: mergedCourses,
          },
        });
      }
    }

    // ====================
    // SEND EMAIL
    // ====================

    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: user.email,
        subject: 'Course Enrollment Successful',
        text: `You successfully enrolled in the course "${course.title}".`,
      });

    // ====================
    // SUCCESS
    // ====================

    return {
      success: true,
    };
  },
});
