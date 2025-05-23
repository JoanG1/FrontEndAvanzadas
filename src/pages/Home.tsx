// src/pages/Home.tsx
import React from 'react';
import Map from '../components/ui/Map';
import { UserProfileIcon } from "../components/ui/UserProfileIcon";


const Home: React.FC = () => {
	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="p-4 flex flex-col items-center text-center w-full max-w-6xl">

      		<div className="w-full max-w-6xl flex justify-center">
				<UserProfileIcon />
        		<Map />
      		</div>
    </div>
	</div>

	);
};

export default Home;
