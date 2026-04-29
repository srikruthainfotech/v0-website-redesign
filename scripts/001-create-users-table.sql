-- Create users table for admin login
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO users (username, password) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;
