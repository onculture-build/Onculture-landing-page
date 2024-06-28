import React, { useRef } from 'react';
import useVideoPlayer from '../lib/hooks/useVideoPlayer';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react';
import Vimeo from '@u-wave/react-vimeo';
import CustomModal from './modal';

interface VideoProps {
  url?: string;
  coverImage?: string;
  message?: string;
}

const HeroVideo = ({
  url = 'https://vimeo.com/944443236?share=copy',
  coverImage = '/assets/images/home-video-poster.png',
  message = 'see why we built OnCulture',
}: VideoProps) => {
  const videoElement = useRef(null);
  const { playerState, togglePlay } = useVideoPlayer(videoElement);
  return (
    <>
      <AspectRatio
        maxW={'700px'}
        w={{ lg: '40rem' }}
        h={{ base: '50rem', lg: '50rem' }}
        ratio={1}
        mx={'auto'}
        position={'relative'}
      >
        <Flex
          borderRadius={6}
          bgImage={`linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${coverImage})`}
          bgSize={'cover'}
          bgRepeat={'no-repeat'}
          bgPosition={'center'}
        >
          <video src={''} ref={videoElement} width={'100%'} />
          <Flex
            position={'absolute'}
            alignItems={'center'}
            bottom={20}
            left={5}
            gap={4}
            color={'brand.white'}
            cursor={'pointer'}
            onClick={togglePlay}
          >
            <Box w={'fit-content'}>
              <BsFillPlayCircleFill fontSize={36} />
            </Box>
            <Box>
              <Text fontSize={'label'} fontWeight={600}>
                Play this video to
              </Text>
              <Text fontSize={'label'} fontWeight={600}>
                {message}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </AspectRatio>
      <CustomModal isOpen={playerState.isPlaying} onClose={togglePlay}>
        <Vimeo
          video={url}
          height='100% !important'
          width='100% !important'
          controls
          showByline
          showPortrait
          responsive
          autoplay
        />
      </CustomModal>
    </>
  );
};

export default HeroVideo;
