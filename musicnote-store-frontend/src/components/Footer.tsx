import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

export const Footer = () => {
    return (
      <footer className="bg-note-surface border-t border-note-border text-center py-4 text-note-muted">
        <p>© 2025 음표상점. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="#" className="hover:text-note-primary">이용약관</a>
          <a href="#" className="hover:text-note-primary">개인정보처리방침</a>
          <a href="#" className="hover:text-note-primary">고객센터</a>
        </div>
      </footer>
    );
};
  