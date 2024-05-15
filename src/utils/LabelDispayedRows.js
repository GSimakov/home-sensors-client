export default function defaultLabelDisplayedRows({from, to, count, size})
{
  return  `${from - size}–${to - size} of ${count !== -1 ? count : `more than ${to}`}`; 
}