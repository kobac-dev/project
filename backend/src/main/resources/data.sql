-- Insert default addresses
INSERT INTO addresses (country, district, location, area) VALUES
('United States', 'Manhattan', 'Upper East Side', 'Central Park Area'),
('United States', 'Brooklyn', 'Park Slope', 'Prospect Park'),
('United States', 'Queens', 'Astoria', 'Ditmars'),
('United States', 'Manhattan', 'SoHo', 'Spring Street'),
('United States', 'Brooklyn', 'Williamsburg', 'Bedford Avenue')
ON CONFLICT DO NOTHING;

-- Insert default statuses
INSERT INTO statuses (status_name, description) VALUES
('Active', 'Currently active'),
('Graduated', 'Successfully graduated'),
('In Progress', 'Currently studying'),
('Suspended', 'Temporarily suspended')
ON CONFLICT DO NOTHING;

-- Insert default subjects
INSERT INTO subjects (subject_name, is_active, created_at) VALUES
('Mathematics', true, CURRENT_TIMESTAMP),
('Physics', true, CURRENT_TIMESTAMP),
('Chemistry', true, CURRENT_TIMESTAMP),
('Biology', true, CURRENT_TIMESTAMP),
('English Literature', true, CURRENT_TIMESTAMP),
('Computer Science', true, CURRENT_TIMESTAMP),
('History', true, CURRENT_TIMESTAMP),
('Spanish', true, CURRENT_TIMESTAMP),
('French', true, CURRENT_TIMESTAMP),
('Economics', true, CURRENT_TIMESTAMP)
ON CONFLICT (subject_name) DO NOTHING;

-- Insert default admin user
INSERT INTO users (username, email, password, role, is_enabled, is_account_non_expired, is_account_non_locked, is_credentials_non_expired, created_at, updated_at) VALUES
('admin', 'admin@tutorhub.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN', true, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample tutor users
INSERT INTO users (username, email, password, role, is_enabled, is_account_non_expired, is_account_non_locked, is_credentials_non_expired, created_at, updated_at) VALUES
('sarah.johnson', 'sarah.johnson@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TUTOR', true, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('michael.chen', 'michael.chen@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TUTOR', true, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('emily.rodriguez', 'emily.rodriguez@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'TUTOR', true, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample parent users
INSERT INTO users (username, email, password, role, is_enabled, is_account_non_expired, is_account_non_locked, is_credentials_non_expired, created_at, updated_at) VALUES
('jennifer.williams', 'jennifer.williams@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'PARENT', true, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('robert.davis', 'robert.davis@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'PARENT', true, true, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample tutors
INSERT INTO tutors (full_name, sex, phone_number, email, address_id, max_number, profile_image, user_id, rating, hourly_rate, status, created_at) VALUES
('Sarah Johnson', 'FEMALE', '+1 (555) 123-4567', 'sarah.johnson@email.com', 1, 10, 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg', (SELECT id FROM users WHERE email = 'sarah.johnson@email.com'), 4.8, 45.00, 'ACTIVE', CURRENT_TIMESTAMP),
('Michael Chen', 'MALE', '+1 (555) 234-5678', 'michael.chen@email.com', 2, 8, 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', (SELECT id FROM users WHERE email = 'michael.chen@email.com'), 4.9, 50.00, 'ACTIVE', CURRENT_TIMESTAMP),
('Emily Rodriguez', 'FEMALE', '+1 (555) 345-6789', 'emily.rodriguez@email.com', 3, 12, 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg', (SELECT id FROM users WHERE email = 'emily.rodriguez@email.com'), 4.7, 40.00, 'ACTIVE', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample parents
INSERT INTO parents (full_name, phone_number, address_id, sex, profile_image, user_id, children_count, created_at) VALUES
('Jennifer Williams', '+1 (555) 987-6543', 1, 'FEMALE', 'https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg', (SELECT id FROM users WHERE email = 'jennifer.williams@email.com'), 2, CURRENT_TIMESTAMP),
('Robert Davis', '+1 (555) 876-5432', 2, 'MALE', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg', (SELECT id FROM users WHERE email = 'robert.davis@email.com'), 1, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Insert sample educations
INSERT INTO educations (tutor_id, highest_degree, graduate_year, status_id) VALUES
((SELECT id FROM tutors WHERE email = 'sarah.johnson@email.com'), 'PhD in Mathematics', 2018, 2),
((SELECT id FROM tutors WHERE email = 'michael.chen@email.com'), 'Master of Science in Chemistry', 2020, 2),
((SELECT id FROM tutors WHERE email = 'emily.rodriguez@email.com'), 'Master of Arts in English Literature', 2019, 2)
ON CONFLICT DO NOTHING;

-- Insert tutor-subject relationships
INSERT INTO tutor_subjects (tutor_id, subject_id) VALUES
((SELECT id FROM tutors WHERE email = 'sarah.johnson@email.com'), (SELECT id FROM subjects WHERE subject_name = 'Mathematics')),
((SELECT id FROM tutors WHERE email = 'sarah.johnson@email.com'), (SELECT id FROM subjects WHERE subject_name = 'Physics')),
((SELECT id FROM tutors WHERE email = 'michael.chen@email.com'), (SELECT id FROM subjects WHERE subject_name = 'Chemistry')),
((SELECT id FROM tutors WHERE email = 'michael.chen@email.com'), (SELECT id FROM subjects WHERE subject_name = 'Biology')),
((SELECT id FROM tutors WHERE email = 'emily.rodriguez@email.com'), (SELECT id FROM subjects WHERE subject_name = 'English Literature'))
ON CONFLICT DO NOTHING;

-- Insert sample availability
INSERT INTO availability (tutor_id, day_of_week, start_time, end_time) VALUES
((SELECT id FROM tutors WHERE email = 'sarah.johnson@email.com'), 'Monday', '09:00:00', '17:00:00'),
((SELECT id FROM tutors WHERE email = 'sarah.johnson@email.com'), 'Wednesday', '09:00:00', '17:00:00'),
((SELECT id FROM tutors WHERE email = 'sarah.johnson@email.com'), 'Friday', '09:00:00', '17:00:00'),
((SELECT id FROM tutors WHERE email = 'michael.chen@email.com'), 'Tuesday', '10:00:00', '18:00:00'),
((SELECT id FROM tutors WHERE email = 'michael.chen@email.com'), 'Thursday', '10:00:00', '18:00:00'),
((SELECT id FROM tutors WHERE email = 'emily.rodriguez@email.com'), 'Monday', '14:00:00', '20:00:00'),
((SELECT id FROM tutors WHERE email = 'emily.rodriguez@email.com'), 'Wednesday', '14:00:00', '20:00:00')
ON CONFLICT DO NOTHING;