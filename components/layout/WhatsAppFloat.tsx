"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/data";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink("Hello Think Build, I'd like to ask about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" aria-hidden />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 29l8.27-2.16a12.1 12.1 0 0 0 3.77.6h.01c6.63 0 12.03-5.37 12.03-11.97C28.08 8.36 22.68 3 16.04 3Zm0 21.92h-.01c-1.2 0-2.37-.32-3.4-.93l-.24-.14-4.91 1.28 1.31-4.77-.16-.25a9.87 9.87 0 0 1-1.52-5.14c0-5.49 4.48-9.95 9.94-9.95 2.65 0 5.15 1.03 7.03 2.9a9.85 9.85 0 0 1 2.91 7.04c0 5.49-4.47 9.96-9.95 9.96Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.22 1.37.19 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </motion.a>
  );
}
