-- Seed data from src/data/mock.ts

insert into public.site_settings (
  name, title, short_title, description, bio, email, linkedin, github, location, github_profile_url
) values (
  'Alirio Gutierrez',
  'Golang Developer | Python | NodeJS | Senior Backend Developer | Engineering Lead',
  'Tech Lead & Senior Backend Developer',
  'Passionate Software Developer who truly believes that tackling new challenges helps us grow professionally and provides constant learning opportunities. With a focus on leadership and teamwork, I''m always ready to take on challenges and find innovative solutions.',
  'My commitment to continuous learning drives me to seek new opportunities to grow and contribute to the success of the projects I''m part of. Outside of code, you''ll find me reading a good sci-fi book or exploring worlds in video games.',
  'alirio1925@gmail.com',
  'https://www.linkedin.com/in/alirio-gutierrez-41a4a4197/',
  'https://github.com/AjxGnx',
  'Bogotá, Colombia',
  'https://github.com/AjxGnx'
);

insert into public.skills (name, level, category, sort_order) values
  ('Go', 95, 'Backend', 1),
  ('Python', 90, 'Backend', 2),
  ('Node.js', 88, 'Backend', 3),
  ('Microservices', 92, 'Architecture', 4),
  ('SOLID Principles', 90, 'Architecture', 5),
  ('Apache Kafka', 85, 'Backend', 6),
  ('PostgreSQL', 88, 'Databases', 7),
  ('MongoDB', 82, 'Databases', 8),
  ('BigQuery', 78, 'Databases', 9),
  ('Firebase', 80, 'Databases', 10),
  ('Docker', 85, 'DevOps & Cloud', 11),
  ('AWS (S3)', 82, 'DevOps & Cloud', 12),
  ('Airflow', 75, 'DevOps & Cloud', 13),
  ('CI/CD', 80, 'DevOps & Cloud', 14),
  ('Django', 78, 'Frameworks', 15),
  ('Laravel', 72, 'Frameworks', 16),
  ('React / Next.js', 80, 'Frameworks', 17),
  ('Flutter', 65, 'Frameworks', 18);

insert into public.work_experiences (role, company, period, location, description, technologies, sort_order) values
  (
    'Tech Lead', 'Gipsyy', 'Nov 2025 - Present', 'Brazil (Remote)',
    'Leading the development team technically, defining system architecture and guiding the implementation of scalable solutions for the transportation platform.',
    array['Go', 'Node.js', 'Microservices', 'Docker'], 1
  ),
  (
    'Full Stack Developer', 'Gipsyy', 'Jan 2025 - Present', 'Brazil (Remote)',
    'Full-stack development of the platform, building both backend services and user interfaces to improve the product experience.',
    array['Go', 'Node.js', 'React', 'PostgreSQL'], 2
  ),
  (
    'Backend Developer', 'Platzi', 'Jul 2024 - Dec 2024', 'Bogotá, Colombia',
    'Developed backend services for the largest online education platform in Latin America, improving the learning experience for millions of students.',
    array['Python', 'Go', 'PostgreSQL', 'Microservices'], 3
  ),
  (
    'Engineering Lead Core @Monetization', 'Rappi', 'Oct 2021 - Mar 2024', 'Bogotá, Colombia',
    'Led the development team technically. Actively collaborated on system design and architecture, oversaw software quality through testing and best practices, participated in project planning, and resolved technical and team issues. Acted as a bridge between tech and other teams, facilitating communication and providing technical training. Responsible for creating the technical backlog for sprints.',
    array['Go', 'Python', 'Microservices', 'Apache Kafka', 'AWS'], 4
  ),
  (
    'Backend Developer', 'Rappi', 'Aug 2019 - Mar 2024', 'Bogotá, Colombia',
    'Proposed technical solutions for product requirements, implemented microservice and event-driven architectures using Apache Kafka. Worked with Go, Python, NodeJS, relational and non-relational databases. Handled BigData tasks with Pandas, implementing DAGs in Airflow for BigQuery. Part of the BBR Core team building brands.rappi.com with custom auth, Amazon S3, audience targeting for ads, and Firebase realtime database.',
    array['Go', 'Python', 'Node.js', 'Kafka', 'BigQuery', 'Airflow', 'Firebase', 'AWS S3'], 5
  ),
  (
    'Backend Developer', 'BMKero''s', '2017 - Jul 2019', 'Falcón, Venezuela',
    'Developed diverse projects in Django and Laravel to meet client needs, as well as exploring mobile development with Flutter.',
    array['Django', 'Laravel', 'Python', 'Flutter'], 6
  );

insert into public.education_entries (institution, degree, field, period, sort_order) values
  (
    'Universidad Politécnica Territorial de Falcón Alonso Gamero',
    'Associate Degree in Computer Science',
    'Computer Engineering',
    '2015 - 2018',
    1
  );

insert into public.certifications (name, issuer, sort_order) values
  ('Unit Testing in Go', 'Platzi', 1),
  ('English B1', 'Language Certification', 2),
  ('Professional Software Architecture', 'Platzi', 3),
  ('Assertive Communication', 'Platzi', 4),
  ('Effective Communication', 'Platzi', 5);

insert into public.portfolio_projects (title, description, image_path, technologies, github_url, live_url, featured, sort_order) values
  (
    'Brands Rappi Portal',
    'Brand portal (brands.rappi.com) with custom authentication and authorization, business module, audience system for ad products, reports and notifications with Firebase realtime database.',
    '/projects/brands.jpg',
    array['Go', 'Node.js', 'Firebase', 'AWS S3', 'PostgreSQL'],
    'https://github.com/AjxGnx', 'https://brands.rappi.com', true, 1
  ),
  (
    'Monetization Microservices',
    'Event-driven microservices architecture for Rappi''s monetization core, processing millions of transactions with Apache Kafka and Go.',
    '/projects/monetization.jpg',
    array['Go', 'Apache Kafka', 'Microservices', 'Docker', 'AWS'],
    'https://github.com/AjxGnx', '', true, 2
  ),
  (
    'BigData Pipeline',
    'Massive data processing pipeline implementing DAGs in Apache Airflow with Pandas to move and transform data into BigQuery for business analytics.',
    '/projects/bigdata.jpg',
    array['Python', 'Pandas', 'Airflow', 'BigQuery', 'GCP'],
    'https://github.com/AjxGnx', '', true, 3
  ),
  (
    'Gipsyy Transport Platform',
    'Full-stack development of the transportation platform, leading the technical team in implementing new features and performance improvements.',
    '/projects/gipsyy.jpg',
    array['Go', 'Node.js', 'React', 'PostgreSQL', 'Docker'],
    'https://github.com/AjxGnx', '', true, 4
  ),
  (
    'Ads Audience System',
    'Audience segmentation system for advertising products within Rappi, enabling brands to target specific users.',
    '/projects/audiences.jpg',
    array['Go', 'PostgreSQL', 'Apache Kafka', 'Redis'],
    'https://github.com/AjxGnx', '', false, 5
  ),
  (
    'Django & Laravel Projects',
    'Various backend projects for clients at BMKero''s, from REST APIs to full web applications, including mobile development with Flutter.',
    '/projects/django.jpg',
    array['Django', 'Laravel', 'Python', 'Flutter', 'PostgreSQL'],
    'https://github.com/AjxGnx', '', false, 6
  );

insert into public.books (title, author, cover_path, rating, status, review, category, sort_order) values
  ('Clean Code', 'Robert C. Martin', '/books/cleancode.jpg', 5, 'Read',
   'An essential classic for any developer. It completely changed the way I write code.', 'Development', 1),
  ('The Pragmatic Programmer', 'David Thomas & Andrew Hunt', '/books/pragmatic.jpg', 5, 'Read',
   'Practical, timeless advice on the craft of programming. I re-read it every year.', 'Development', 2),
  ('Dune', 'Frank Herbert', '/books/dune.jpg', 5, 'Read',
   'A sci-fi masterpiece. The worldbuilding is breathtaking.', 'Sci-Fi', 3),
  ('Neuromancer', 'William Gibson', '/books/neuromancer.jpg', 4, 'Read',
   'The book that defined cyberpunk. Visionary and fascinating.', 'Sci-Fi', 4),
  ('Designing Data-Intensive Applications', 'Martin Kleppmann', '/books/ddia.jpg', 5, 'Reading',
   'The bible of distributed systems. Every chapter is a gem.', 'Development', 5),
  ('Project Hail Mary', 'Andy Weir', '/books/hailmary.jpg', 4, 'To Read', '', 'Sci-Fi', 6),
  ('Atomic Habits', 'James Clear', '/books/atomic.jpg', 4, 'Read',
   'Excellent for understanding how to build good habits and break bad ones.', 'Productivity', 7),
  ('The Mythical Man-Month', 'Frederick P. Brooks Jr.', '/books/mythical.jpg', 4, 'To Read', '', 'Development', 8);

insert into public.games (title, platform, genre, rating, status, image_path, review, sort_order) values
  ('The Legend of Zelda: Tears of the Kingdom', 'Nintendo Switch', 'Action / Adventure', 10, 'Completed', '/games/zelda.jpg',
   'A masterpiece. The freedom of exploration and the physics are unmatched.', 1),
  ('Elden Ring', 'PC', 'RPG / Souls-like', 9.5, 'Completed', '/games/eldenring.jpg',
   'FromSoftware at their best. The most fascinating open world I''ve explored.', 2),
  ('Baldur''s Gate 3', 'PC', 'RPG', 9.5, 'Playing', '/games/bg3.jpg',
   'The definitive RPG. Choices truly matter and the narrative is brilliant.', 3),
  ('Hades', 'PC / Switch', 'Roguelike', 9, 'Completed', '/games/hades.jpg',
   'Addictive gameplay with a narrative that integrates perfectly with the roguelike loop.', 4),
  ('Hollow Knight', 'PC', 'Metroidvania', 9, 'Completed', '/games/hollowknight.jpg',
   'One of the best metroidvanias ever made. Atmospheric and challenging.', 5),
  ('Silksong', 'PC / Switch', 'Metroidvania', 0, 'Backlog', '/games/silksong.jpg',
   'Can''t wait! The most anticipated game on my list.', 6),
  ('Cyberpunk 2077', 'PC', 'RPG / Action', 8.5, 'Completed', '/games/cyberpunk.jpg',
   'After the patches, an incredible experience. Night City is mesmerizing.', 7),
  ('Celeste', 'PC / Switch', 'Platformer', 9, 'Completed', '/games/celeste.jpg',
   'A perfect platformer with an emotional message. Beautifully calibrated difficulty.', 8);
