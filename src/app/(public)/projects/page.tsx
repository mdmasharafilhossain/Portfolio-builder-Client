import ProjectCard from '@/components/modules/project/ProjectCard';
import { projectAPI } from '@/lib/api';
import { Project } from '@/types';
import { Sparkles, Grid3X3 } from 'lucide-react';

async function getProjects(): Promise<Project[]> {
  try {
    const response = await projectAPI.getAll();
    return response.data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Extract unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();

  const featuredProjects = projects.filter(project => project.featured);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="pt-20 relative z-10">
        <div className="section-padding">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-lg blur opacity-30"></div>
                  <div className="relative bg-white dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-100 dark:border-gray-800 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Grid3X3 className="w-5 h-5 text-[#5D2F77]" />
                      <p className="text-sm font-semibold uppercase tracking-widest text-[#5D2F77]">
                        My Portfolio
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Creative <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A collection of my work showcasing innovative solutions and cutting-edge technologies
              </p>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#3E1E68] rounded-full"></div>
                  <span>{projects.length} Total Projects</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#5D2F77] rounded-full animate-pulse"></div>
                  <span>{featuredProjects.length} Featured</span>
                </div>
              </div>
            </div>

          

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <section className="mb-20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      Featured Projects
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Highlighted work showcasing my best solutions
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-white text-sm font-semibold">
                    <Sparkles size={16} fill="currentColor" />
                    <span>Top Picks</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project?.id} project={project} featured />
                  ))}
                </div>
              </section>
            )}

            

            {/* Projects Counter */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                <span className="text-gray-600 dark:text-gray-400">
                  Showing <span id="projects-count" className="font-bold text-[#3E1E68] dark:text-[#8B5FBF] text-lg">{projects.length}</span> projects
                </span>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {allTechnologies.length}+ technologies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client-side filtering script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const projects = ${JSON.stringify(projects)};
              const searchInput = document.getElementById('search-input');
              const technologyFilter = document.getElementById('technology-filter');
              const projectsGrid = document.getElementById('projects-grid');
              const projectsCount = document.getElementById('projects-count');
              const activeFilters = document.getElementById('active-filters');
              
              function filterProjects() {
                const searchTerm = searchInput.value.toLowerCase();
                const selectedTech = technologyFilter.value;
                
                const filtered = projects.filter(project => {
                  const matchesSearch = !searchTerm || 
                    project.title.toLowerCase().includes(searchTerm) ||
                    project.description.toLowerCase().includes(searchTerm) ||
                    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
                  
                  const matchesTech = !selectedTech || 
                    project.technologies.includes(selectedTech);
                  
                  return matchesSearch && matchesTech;
                });
                
                updateProjectsDisplay(filtered);
                updateActiveFilters(selectedTech, searchTerm);
              }
              
              function updateProjectsDisplay(filteredProjects) {
                if (projectsGrid) {
                  projectsGrid.innerHTML = '';
                  
                  filteredProjects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    projectCard.innerHTML = \`
                      <div class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                        <div class="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-[#F8F5FF] to-[#EDE7F6] dark:from-[#1a1033] dark:to-[#2d1b4e]">
                          \${project.imageUrl ? \`
                            <img
                              src="\${project.imageUrl}"
                              alt="\${project.title}"
                              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          \` : \`
                            <div class="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] flex items-center justify-center">
                              <span class="text-white text-xl font-bold text-center px-6">
                                \${project.title}
                              </span>
                            </div>
                          \`}
                          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div class="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            \${project.githubUrl ? \`
                              <a
                                href="\${project.githubUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
                              >
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            \` : ''}
                            \${project.liveUrl ? \`
                              <a
                                href="\${project.liveUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
                              >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                </svg>
                              </a>
                            \` : ''}
                          </div>
                          \${project.featured ? \`
                            <div class="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg">
                              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span>Featured</span>
                            </div>
                          \` : ''}
                        </div>
                        
                        <div class="p-6 md:p-7">
                          <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#5D2F77] dark:group-hover:text-[#8B5FBF] transition-colors duration-300 cursor-pointer leading-tight">
                            \${project.title}
                          </h3>
                          
                          <p class="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 leading-relaxed text-sm md:text-base">
                            \${project.description}
                          </p>
                          
                          <div class="flex flex-wrap gap-2 mb-6">
                            \${project.technologies.slice(0, 4).map(tech => \`
                              <span class="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] text-xs font-semibold rounded-full border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105 hover:shadow-md">
                                \${tech}
                              </span>
                            \`).join('')}
                            \${project.technologies.length > 4 ? \`
                              <span class="px-3 py-1.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
                                +\${project.technologies.length - 4}
                              </span>
                            \` : ''}
                          </div>
                          
                          <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div class="flex gap-5">
                              \${project.githubUrl ? \`
                                <a
                                  href="\${project.githubUrl}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:scale-105 text-sm font-medium"
                                >
                                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                  <span>Code</span>
                                </a>
                              \` : ''}
                              \${project.liveUrl ? \`
                                <a
                                  href="\${project.liveUrl}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="flex items-center gap-2 text-[#5D2F77] hover:text-[#3E1E68] dark:text-[#8B5FBF] dark:hover:text-[#A67FCF] transition-all duration-300 hover:scale-105 text-sm font-medium"
                                >
                                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                  </svg>
                                  <span>Live Demo</span>
                                </a>
                              \` : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    \`;
                    projectsGrid.appendChild(projectCard);
                  });
                }
                
                if (projectsCount) {
                  projectsCount.textContent = filteredProjects.length;
                }
              }
              
              function updateActiveFilters(selectedTech, searchTerm) {
                if (activeFilters) {
                  activeFilters.innerHTML = '';
                  
                  if (selectedTech || searchTerm) {
                    activeFilters.classList.remove('hidden');
                    
                    if (searchTerm) {
                      const searchFilter = document.createElement('div');
                      searchFilter.className = 'flex items-center space-x-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] px-4 py-2 rounded-full text-sm font-medium border border-[#3E1E68]/10 dark:border-[#5D2F77]/20';
                      searchFilter.innerHTML = \`
                        <span>Search: "\${searchTerm}"</span>
                        <button onclick="clearSearch()" class="hover:text-[#5D2F77] transition-colors">×</button>
                      \`;
                      activeFilters.appendChild(searchFilter);
                    }
                    
                    if (selectedTech) {
                      const techFilter = document.createElement('div');
                      techFilter.className = 'flex items-center space-x-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] px-4 py-2 rounded-full text-sm font-medium border border-[#3E1E68]/10 dark:border-[#5D2F77]/20';
                      techFilter.innerHTML = \`
                        <span>Tech: \${selectedTech}</span>
                        <button onclick="clearTechFilter()" class="hover:text-[#5D2F77] transition-colors">×</button>
                      \`;
                      activeFilters.appendChild(techFilter);
                    }
                    
                    const clearAll = document.createElement('button');
                    clearAll.className = 'text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline ml-2';
                    clearAll.textContent = 'Clear all';
                    clearAll.onclick = clearAllFilters;
                    activeFilters.appendChild(clearAll);
                  } else {
                    activeFilters.classList.add('hidden');
                  }
                }
              }
              
              window.clearSearch = function() {
                searchInput.value = '';
                filterProjects();
              };
              
              window.clearTechFilter = function() {
                technologyFilter.value = '';
                filterProjects();
              };
              
              window.clearAllFilters = function() {
                searchInput.value = '';
                technologyFilter.value = '';
                filterProjects();
              };
              
              searchInput.addEventListener('input', filterProjects);
              technologyFilter.addEventListener('change', filterProjects);
              
              // Initial filter
              filterProjects();
            });
          `,
        }}
      />
    </div>
  );
}

export const revalidate = 60;