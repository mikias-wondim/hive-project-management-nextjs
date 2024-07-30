'use client';
import React from 'react';

const LandingPage: React.FC = () => {
  //   const [darkMode, setDarkMode] = useState(false);

  //   const toggleDarkMode = () => {
  //     setDarkMode(!darkMode);
  //     document.documentElement.classList.toggle('dark', !darkMode);
  //   };

  return (
    <div>
      <div className="h-minus-80">
        <div className="relative isolate overflow-hidden px-6 pt-16 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 h-full">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[200rem] w-[200rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-[-100px]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.5"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-grow flex-col justify-center items-start text-center lg:flex-auto lg:py-32 lg:text-left ">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Streamline Your Workflow,
                <br />
                One Task at a Time.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Your ultimate project management tool, designed to help teams
                achieve their goals
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
              </div>
            </div>

            <div className="mt-16 h-80 lg:mt-8 w-[300px]">
              <img
                alt="App screenshot"
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                width={1824}
                height={1080}
                className="left-0 top-0 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
