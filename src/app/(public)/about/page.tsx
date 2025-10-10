import ExperienceTimeline from '@/components/modules/about/ExperienceTimeline';
import SkillsByCategory from '@/components/modules/about/SkillsByCategory';
import SocialLinks from '@/components/modules/about/SocialLinks';
import { aboutAPI } from '@/lib/api';
import { About, Skill, Experience, SocialLink } from '@/types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download,

  Building,
  Code,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Award,

  Briefcase,
  Sparkles,
  Server,
  Settings
} from 'lucide-react';
import Image from 'next/image';

async function getAboutData(): Promise<About | null> {
  try {
    const response = await aboutAPI.get();
    return response.data.data;
   
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

// Skill Progress Bar Component

// Experience Timeline Component

// Social Link Component


// Skills by Category Component


export default async function AboutPage() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
        <div className="pt-32 text-center">
          <div className="container mx-auto max-w-2xl">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-full border border-gray-100 dark:border-gray-800 shadow-lg">
                <Award size={48} className="text-gray-300 dark:text-gray-700" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              About Me
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Unable to load about information at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl text-center">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-3xl blur-xl opacity-20"></div>
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mx-auto">
                      {aboutData.avatarUrl ? (
                        <Image
                          src={aboutData.avatarUrl}
                          alt={aboutData.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {aboutData.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    {aboutData.name}
                  </h1>
                  <p className="text-lg font-semibold bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent mb-4">
                    {aboutData.title}
                  </p>
                  
                  {/* Social Links */}
                  {aboutData.socialLinks.length > 0 && (
                    <div className="mb-6 flex justify-center">
                      <SocialLinks socialLinks={aboutData.socialLinks} />
                    </div>
                  )}
                  
                  {/* Resume Download */}
                  {aboutData.resumeUrl && (
                    <a
                      href={aboutData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-6 py-3 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full justify-center"
                    >
                      <Download size={20} />
                      <span>Download Resume</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Bio and Contact Info */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                        Hello, I am {aboutData.name.split(' ')[0]} 👋
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">Welcome to my world</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {aboutData.bio}
                  </p>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                          <Mail className="text-[#5D2F77]" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white font-semibold">
                            {aboutData.email}
                          </p>
                        </div>
                      </div>
                      
                      {aboutData.phone && (
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                            <Phone className="text-[#5D2F77]" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                            <p className="text-gray-900 dark:text-white font-semibold">
                              {aboutData.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {aboutData.location && (
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                            <MapPin className="text-[#5D2F77]" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                            <p className="text-gray-900 dark:text-white font-semibold">
                              {aboutData.location}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                          <Briefcase className="text-[#5D2F77]" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                          <p className="text-gray-900 dark:text-white font-semibold">
                            {aboutData.experiences.length}+ years
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {aboutData.skills.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-lg blur opacity-30"></div>
                    <div className="relative bg-white dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-100 dark:border-gray-800 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Code className="w-5 h-5 text-[#5D2F77]" />
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#5D2F77]">
                          Skills & Expertise
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  Technical <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Skills</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Technologies and tools I work with to bring ideas to life
                </p>
              </div>
              
              <SkillsByCategory skills={aboutData.skills} />
            </div>
          </section>
        )}

        {/* Experience Section */}
        {aboutData.experiences.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-[#F8F5FF] to-[#EDE7F6] dark:from-[#1a1033] dark:to-[#2d1b4e]">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-lg blur opacity-30"></div>
                    <div className="relative bg-white dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-100 dark:border-gray-800 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-[#5D2F77]" />
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#5D2F77]">
                          Career Journey
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  Work <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Experience</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  My professional journey and career milestones
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <ExperienceTimeline experiences={aboutData.experiences} />
              </div>
            </div>
          </section>
        )}

        {/* Call to Action Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-black text-white mb-4">
                Lets Work Together
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Interested in collaborating on a project? I am always open to discussing new opportunities and innovative ideas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
               
                {aboutData.resumeUrl && (
                  <a
                    href={aboutData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-[#3E1E68] transition-all duration-300 hover:scale-105"
                  >
                    <Download size={20} />
                    <span>Download Resume</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// This page uses Static Site Generation (SSG)
export const dynamic = 'force-static';