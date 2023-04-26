import React from "react";

export default function Footer() {
  return (
    <footer class="footer relative bg-darkPurple py-4">
      <div class="flex flex-row items-center justify-center h-full">
        <div class="footer-header mr-4">
          <h3 class="footer-title text-white text-center font-bold text-lg">
            &copy; {new Date().getFullYear()} - SJM
          </h3>
        </div>
      </div>
    </footer>
  );
}
