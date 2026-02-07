import React from 'react';
import { X, Zap, Box, GitBranch, Globe, Radio, Share2, Ship, Save, ShieldCheck, Users } from 'lucide-react';

interface SystemSpecsProps {
  onClose: () => void;
}

const SystemSpecs: React.FC<SystemSpecsProps> = ({ onClose }) => {
  const categories = [
    {
      title: "Category I: System Capability",
      items: [
        { 
          title: "1️⃣ Concurrency", 
          desc: "The system supports multiple users accessing the API server simultaneously, allowing concurrent requests without performance degradation.", 
          icon: Zap 
        }
      ]
    },
    {
      title: "Category II: Deployment",
      items: [
        { 
          title: "2️⃣ Docker", 
          desc: "The backend application is containerized using Docker to ensure consistent environments and simplify deployment across different platforms.", 
          icon: Box 
        }
      ]
    },
    {
      title: "Category III: Version Control & Infrastructure",
      items: [
        { 
          title: "3️⃣ Git", 
          desc: "Git is used for source code version control, enabling collaboration, change tracking, and rollback when necessary.", 
          icon: GitBranch 
        },
        { 
          title: "4️⃣ Terraform", 
          desc: "Terraform is used to automatically provision and manage cloud infrastructure in a reproducible and scalable manner.", 
          icon: Globe 
        }
      ]
    },
    {
      title: "Category IV: Scalability & Communication",
      items: [
        { 
          title: "5️⃣ Pub/Sub", 
          desc: "A Publish/Subscribe mechanism is used to exchange result data between services in an asynchronous and decoupled way.", 
          icon: Radio 
        },
        { 
          title: "6️⃣ Load Balancer", 
          desc: "A load balancer distributes incoming user requests across multiple servers to improve performance and reliability.", 
          icon: Share2 
        },
        { 
          title: "7️⃣ Kubernetes (K8s)", 
          desc: "Kubernetes is used to orchestrate containers, manage deployments, and automatically scale services based on workload.", 
          icon: Ship 
        }
      ]
    },
    {
      title: "Category V: Reliability & Protection",
      items: [
        { 
          title: "8️⃣ Backup", 
          desc: "The system includes a backup mechanism to securely store result data and enable recovery in case of failure.", 
          icon: Save 
        },
        { 
          title: "9️⃣ Security", 
          desc: "API access is protected using API keys and CORS policies to prevent unauthorized access and enhance security.", 
          icon: ShieldCheck 
        }
      ]
    },
    {
      title: "Category VI: User Support",
      items: [
        { 
          title: "🔟 Multi-users", 
          desc: "The system supports multiple users or players concurrently, allowing real-time interaction without conflicts.", 
          icon: Users 
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-garden-accent p-6 flex justify-between items-center shrink-0 rounded-t-3xl">
          <h2 className="text-2xl font-display font-bold text-white">System Architecture</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="space-y-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-garden-accent mb-4 border-b border-green-200 pb-2">
                  {cat.title}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {cat.items.map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                      <div className="p-2 bg-green-100 rounded-lg text-garden-accent shrink-0">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-700 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSpecs;