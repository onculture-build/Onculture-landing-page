import Benefits from './benefits';
import Companies from './companies';
import Pillars from './pillars';
import Hero from './hero';
import CallToAction from './cta';
import Review from './review';
import BrowseTemplates from './browse-templates';
import './home.css';
import { Box } from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Hero />
      <Box className='pillars'>
        <Pillars />
      </Box>
      <Box className='templates'>
        <BrowseTemplates />
      </Box>
      <Box className='benefits'>
        <Benefits />
      </Box>
      <CallToAction />
      <Review />

      <Companies />
    </>
  );
};

export default Home;
