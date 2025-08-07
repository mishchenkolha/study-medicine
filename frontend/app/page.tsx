import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-80px)]">
            {/* Text */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-700">
                Advance Your Career in Aesthetic & Medical Science
              </h1>
              <p className="text-lg text-gray-600">
                Join industry-leading courses designed by professionals for
                future experts.
              </p>
              <div>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  Explore Courses
                </Link>
              </div>
            </div>

            <div className="w-full h-[400px] lg:h-[500px] relative">
              <Image
                src="/images/medical-hero.jpg"
                alt="Medical research"
                className="object-cover w-full h-full rounded-xl shadow-md"
                fill
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-12">
            Our Popular Courses
          </h3>
          <div className="grid gap-6 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-brand mb-2">
                Botox & Dermal Fillers
              </h4>
              <p>Learn modern injectable techniques with certification.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-brand mb-2">
                Laser & IPL Training
              </h4>
              <p>Hands-on training with medical-grade equipment.</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-brand mb-2">
                Skin Rejuvenation
              </h4>
              <p>Master chemical peels, microneedling & more.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-cover bg-center text-center py-24 px-6 text-darkGray">
        <div className="max-w-3xl mx-auto">
          <h2 className="mobile:text-4xl text-5xl font-bold mb-4">
            Start Your Career in Aesthetic Medicine
          </h2>
          <p className="mobile:text-lg text-xl mb-6">
            Accredited hands-on training with top professionals in Canada
          </p>
        </div>
      </section>
    </>
  );
}
