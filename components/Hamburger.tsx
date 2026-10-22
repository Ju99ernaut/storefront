'use client';

import { forwardRef } from 'react';
import styles from '../styles/Hamburger.module.css';

interface HamburgerProps {
  onOpen: () => void;
}

const Hamburger = forwardRef<HTMLButtonElement, HamburgerProps>(
  ({ onOpen }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.action} action--open`}
        aria-label="Open Menu"
        onClick={onOpen}
      >
        <span className="fa-icon icon--menu"></span>
      </button>
    );
  }
);

Hamburger.displayName = 'Hamburger';

export default Hamburger;
