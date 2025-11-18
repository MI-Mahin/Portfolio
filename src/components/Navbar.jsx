import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observers = [];

    // IntersectionObserver to quickly catch visible sections
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // debug: which section is being intersected
          // eslint-disable-next-line no-console
          console.log('[Navbar][Observer] intersecting:', entry.target.id);
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Fallback: determine nearest section on scroll (more deterministic across layouts)
    let ticking = false;
    const updateActiveByScroll = () => {
      let closestId = active;
      let closestDistance = Infinity;

      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // distance from the viewport center
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - window.innerHeight / 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = item.id;
        }
      });

      // debug: show which section is closest to viewport center
      // eslint-disable-next-line no-console
      console.log('[Navbar][Scroll] closest:', closestId);
      if (closestId && closestId !== active) {
        setActive(closestId);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveByScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // run once to initialize
    updateActiveByScroll();

    return () => {
      observer.disconnect();
      observers.forEach((o) => o.disconnect && o.disconnect());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

    return (
    <nav className="navbar">
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={active === item.id ? 'active' : ''}
              aria-current={active === item.id ? 'page' : undefined}
              onClick={() => { /* no-op; anchor will navigate */ }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
