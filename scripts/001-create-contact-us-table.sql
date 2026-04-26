-- Create contact_us table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_us (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_us ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for contact form submissions)
CREATE POLICY "Allow anonymous inserts" ON contact_us
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions (for admin)
CREATE POLICY "Allow authenticated users to read" ON contact_us
  FOR SELECT
  USING (auth.role() = 'authenticated');
