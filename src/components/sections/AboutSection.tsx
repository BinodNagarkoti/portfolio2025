import SectionWrapper from '@/components/common/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skillsData, type Skill } from '@/lib/data';

const mainSkills: Skill[] = skillsData.find(cat => cat.name === 'Frontend Development')?.skills.slice(0, 4) || [];

const skillToProgress = (skill: Skill) => {
  switch (skill.level) {
    case 'Expert': return 95;
    case 'Intermediate': return 75;
    case 'Basic': return 50;
    default: return 0;
  }
}

const AboutSection = () => {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Professional Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              I am a Bachelor of Information Technology (BIT) graduate from the College of Information Technology and Engineering (CITE), Purvanchal University (PU), Nepal. With a deep passion for web application development, I specialize in leveraging the JavaScript MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript to build robust and scalable solutions.
            </p>
            <p>
              My experience spans across designing and developing diverse applications, from algorithmic trading platforms to e-commerce sites and content management systems. I thrive in dynamic environments, continuously exploring new technologies to deliver cutting-edge products.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {mainSkills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-foreground">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skillToProgress(skill)}%</span>
                </div>
                <Progress value={skillToProgress(skill)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
