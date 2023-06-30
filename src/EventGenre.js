import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ['#6D6875', '#2D6A4F', '#72OO26', '#5A189A', '#7E1946'];

  useEffect(() => { 
    setData(() => getData(events)); 
  }, [events]);

  const getData = (events) => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter(event => event.summary.includes(genre)).length;
       
      return { name: genre, value };
    });
  
    return data;
  };

  return (
    <ResponsiveContainer height={400} >
      <PieChart width={400} height={400}>
        <Legend verticalAlign='bottom' layout='horizontal' />
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey='value'
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {
               data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
               ))
              }

        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;