import React from 'react';

const Home: React.FC = () => {
  return (
    <main className='w3-main'>
      <div className='w3-row w3-padding-64'>
        <div className='w3-twothird w3-container'>
          <h1 className='w3-text-teal'>Heading</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
        <div className='w3-third w3-container'>
          <p className='w3-border w3-padding-large w3-padding-32 w3-center'>
            container 1
          </p>
          <p className='w3-border w3-padding-large w3-padding-64 w3-center'>
            container 2
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
