import React,{ useState, useEffect, useCallback } from 'react';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Download, Clock, FileDown, FileUp } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {filesize} from 'filesize';



dayjs.extend(relativeTime);

interface VideoCardsProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

const VideoCards: React.FC<VideoCardsProps> = ({video, onDownload}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    const getThumbnailUrl = useCallback(() => {})

  return (
    <div>VideoCards</div>
  )
}

export default VideoCards