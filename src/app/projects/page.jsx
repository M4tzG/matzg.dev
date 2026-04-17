import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ProjectsUI from '@features/ProjectsUI'; 

export default function ProjectsPage() {

  const contentDir = path.join(process.cwd(), 'src/content');

  const files = fs.readdirSync(contentDir);

  const projects = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const { data, content } = matter(fileContent);

      return {
        ...data, 
        content,
      };
    })
    .sort((a, b) => a.id - b.id);

  return <ProjectsUI projects={projects} />;
}