interface AttachmentsProps {
  title?: string;
  files?: {
    name: string;
    url: string;
  }[];
  className?: string;
}

export default function Attachments({
  title,
  files,
  className = '',
}: AttachmentsProps) {
  if (!files || files.length === 0) return null;

  return (
    <section className={`w-full ${className}`}>
      {title && (
        <h3 className="mb-4 text-xs font-black tracking-widest text-blue-900 uppercase">
          {title}
        </h3>
      )}

      <div className="flex flex-col gap-2">
        {files.map((file, index) => {
          const extension = file.name.split('.').pop()?.toUpperCase() || 'FILE';

          return (
            <a
              key={index}
              href={`/api/file?url=${file.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:bg-blue-50/50"
            >
              {/* Minimal Blank Page Icon */}
              <div className="flex-shrink-0 text-blue-900 transition-transform group-hover:scale-105">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold tracking-tight text-blue-900">
                  {file.name}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {extension === 'PDF'
                    ? 'PDF Document'
                    : `${extension} Document`}
                </span>
              </div>

              {/* Minimal Download Arrow */}
              <div className="ml-auto translate-x-2 transform pr-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-900"
                >
                  <path d="M12 17V3" />
                  <path d="m6 11 6 6 6-6" />
                  <path d="M19 21H5" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
