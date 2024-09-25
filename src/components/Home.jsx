import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-green bg-opacity-50">
    <h1 className="text-blue-500 text-4xl md:text-6xl font-bold mt-10 ">Welcome to my weather application</h1>
    <p className="text-blue-500 text-xl md:text-2xl font-medium mt-4">Breeze Through the Day with Accurate Weather!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
        <div className="bg-white p-4 rounded-lg shadow-md h-40">
          <h2 className="text-lg font-bold underline">Current Weather</h2>
          <p>Get real-time updates on weather conditions.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md h-40">
          <h2 className="text-lg font-bold underline">Daily Forecast</h2>
          <p>Plan ahead with an up to date forecast.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md h-40">
          <h2 className="text-lg font-bold underline">Weather Alerts</h2>
          <p>Stay informed with timely alerts.</p>
        </div>
      </div>

      <a href="/Login" className="mt-10 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Get Started</a>
      
      {/* <div className="mt-10 p-4">
        <h2 className="text-2xl font-bold underline">What Our Users Say</h2>
        <blockquote className="italic text-gray-700">
          "This app has completely changed how I plan my day!"
        </blockquote>
      </div> */}
    </div>
  );
};

export default Home;
