import * as React from 'react';

type Props = {};
function DropdownMenu(props: Props) {
  const [queryType, setQueryType] = useState('all');
  return (
    <div>
      <label>
        Select Query Type:{' '}
        <select
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
        ></select>
      </label>
    </div>
  );
}

export default DropdownMenu;
