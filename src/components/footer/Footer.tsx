export const Footer = () => {
  return (
    <div className="py-12 bg-white flex items-center justify-center flex-col gap-6">
      <p className="text-center text-gray-800 font-jost font-medium">
        2025 Kaani &copy; All right reserved
      </p>

      <div className="flex items-center gap-5">
        <a
          href="https://www.instagram.com/kaanisterene?igsh=Y2dnbTMxemcxMnZt&utm_source=qr"
          target="_blank"
        >
          <i className="fi fi-brands-instagram flex text-blue-400 text-2xl" />
        </a>
        <a href="https://x.com/kaanisterene?s=21" target="_blank">
          <i className="fi fi-brands-twitter-alt flex text-blue-400 text-2xl"></i>
        </a>
        <a
          href="https://www.tiktok.com/@kaanisterene_3?_t=ZM-8w4tvbuw34o&_r=1"
          target="_blank"
        >
          <i className="fi fi-brands-tik-tok flex text-blue-400 text-2xl"></i>
        </a>
      </div>
    </div>
  );
};
