
import SectionWrapper from '@/components/common/SectionWrapper';
import ProjectCard from '@/components/common/ProjectCard';
import { projectsData, personalProjectsData } from '@/lib/data';

const allProjects = [...projectsData, ...personalProjectsData];

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" title="Personal Works" subtitle="">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
