import React from 'react';

interface Props<T> {
  data: T[];
  children: (value: T) => JSX.Element;
}
export function Grid<T>({ data, children }: Props<T>): JSX.Element {
  return (
    <div
      className='grid justify-content-center'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '15px',
      }}
    >
      {data.map((d: T, index: number) => (
        <div className='grid-item' key={`grid-item-${index}`}>
          {children({ ...d })}
        </div>
      ))}
    </div>
  );
}
