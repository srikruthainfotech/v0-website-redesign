export interface Job {
  id: string
  postId: string
  title: string
  type: string
  location: string
  postedDate: string
  category: string
  description: string
  qualifications: string[]
}

export const jobs: Job[] = [
  {
    id: "123456",
    postId: "123456",
    title: "Software Engineer",
    type: "Full-time",
    location: "USA",
    postedDate: "3 months ago",
    category: "Engineering",
    description: "5-7 years of web development experience in .NET Knowledge of database schema design, normalization and optimization with a strong background in T-SQL Proficiency with SQL Server integra...",
    qualifications: [
      "5-7 years of web development experience in .NET",
      "Knowledge of database schema design, normalization and optimization with a strong background in T-SQL",
      "Proficiency with SQL Server integration services and SQL Reporting Services report development",
      "Demonstrated experience in e-commerce web integration",
      "Advanced knowledge of HTML5/DOM, XML, CSS3, AJAX and JavaScript, particularly the jQuery framework",
      "Understanding of and experience with Web Services",
      "Exposure and strong understanding of MVC frameworks",
      "Experience with version control systems",
      "Qualified candidates must possess:",
      "Desire to cultivate a variety of web and database skill sets in a collaborative team environment",
      "Strong work ethic and ability to learn quickly",
      "Initiative, creativity and attention to detail",
      "Ability to prioritize, execute and deliver projects on time",
    ],
  },
]

export const categories = ["All Categories", "Engineering", "Design", "Marketing", "Sales", "Support"]
export const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Remote"]
export const locations = ["All Locations", "USA", "India", "UK", "Remote"]

export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id)
}
