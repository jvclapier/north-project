'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GroupRideWaiverPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b-2 border-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="inline-block mb-6">
              <Image
                src="/NRTHPROJ_FULL_WORDMARK_FULL_02_TRANSPARENT.png"
                alt="North Project"
                width={600}
                height={150}
                className="w-auto h-12 sm:h-16 md:h-20"
                priority
              />
            </a>
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter font-medium mb-2"
              style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            >
              PARTICIPATION AGREEMENT
            </h1>
            <div className="h-px bg-white w-24 mt-4" />
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          {/* Opening Statement */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              By participating in the North Project Group Ride, you also expressly confirm:
            </p>
          </div>

          {/* Main Agreement */}
          <div className="border-2 border-white p-6 sm:p-8 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              You acknowledge and understand the risks of injury that exist while participating in the North Project Group
              Ride (the &ldquo;Activity&rdquo;). You knowingly and voluntarily assume all risks associated with your participation
              in the Activity, and you waive any and all rights, claims, or causes of action of any kind arising out of
              your participation in the Activity.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              You hereby release and forever discharge North Project, LLC, located at 5752 S. Beaumont Dr.,
              Holladay, Utah 84121, together with its affiliates, managers, members, agents, attorneys, staff,
              volunteers, heirs, representatives, predecessors, successors, and assigns (collectively, the
              &ldquo;Releasees&rdquo;), from any and all claims for physical or psychological injury, illness, disability, or death
              that you may suffer as a direct or indirect result of your participation in the Activity.
            </p>
          </div>

          {/* Risks Section */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-white font-medium uppercase tracking-wider">
              YOU ARE VOLUNTARILY PARTICIPATING IN THE ACTIVITY AND ARE DOING SO ENTIRELY AT YOUR
              OWN RISK. YOU ARE AWARE THAT PARTICIPATION IN GROUP CYCLING ACTIVITIES INVOLVES
              INHERENT RISKS, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-none space-y-2 pl-0">
              <li className="text-base sm:text-lg leading-relaxed text-white/90 border-l-2 border-white pl-4">
                COLLISIONS WITH MOTOR VEHICLES, OTHER CYCLISTS, PEDESTRIANS, OR FIXED OBJECTS;
              </li>
              <li className="text-base sm:text-lg leading-relaxed text-white/90 border-l-2 border-white pl-4">
                ROAD AND WEATHER CONDITIONS;
              </li>
              <li className="text-base sm:text-lg leading-relaxed text-white/90 border-l-2 border-white pl-4">
                EQUIPMENT FAILURE;
              </li>
              <li className="text-base sm:text-lg leading-relaxed text-white/90 border-l-2 border-white pl-4">
                TRAFFIC HAZARDS;
              </li>
              <li className="text-base sm:text-lg leading-relaxed text-white/90 border-l-2 border-white pl-4">
                AND THE NEGLIGENCE OF OTHER PARTICIPANTS.
              </li>
            </ul>
          </div>

          {/* Indemnification */}
          <div className="border-t-2 border-white pt-6">
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              You further agree to indemnify, defend, and hold harmless the Releasees from any and all claims,
              demands, suits, actions, damages, costs, or expenses, including reasonable attorneys&apos; fees, arising out
              of your participation.
            </p>
          </div>

          {/* Medical Authorization */}
          <div className="border-t-2 border-white pt-6">
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              You authorize North Project, LLC to obtain emergency medical care as necessary and agree to assume all
              associated costs.
            </p>
          </div>

          {/* Governing Law */}
          <div className="border-t-2 border-white pt-6">
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              This Agreement shall be governed by the laws of the State of Utah.
            </p>
          </div>

          {/* Participation Confirmation */}
          <div className="border-2 border-white p-6 sm:p-8 mt-8">
            <p className="text-base sm:text-lg leading-relaxed text-white font-medium">
              By joining and participating in the North Project Group Ride, you acknowledge that you have read,
              understood, and agree to be bound by the terms of this Participation Agreement.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-white mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-white/60 uppercase tracking-wider" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
              North Project, LLC
            </div>
            <a
              href="/"
              className="text-sm text-white/60 uppercase tracking-wider hover:text-white transition-colors border-b border-white/60 hover:border-white"
              style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
