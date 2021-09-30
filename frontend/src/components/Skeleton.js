import Skeleton from 'react-loading-skeleton';

const SkeletonUI = () => {
  const skeleton = [];
  for(let i = 0; i<10; i += 1) {
    skeleton.push(<tr key={i}><td colSpan={8}><Skeleton style={{ height: '32px', width: '100%' }} /></td></tr>);
  }
  return (
    skeleton
  );
}

export default SkeletonUI;
