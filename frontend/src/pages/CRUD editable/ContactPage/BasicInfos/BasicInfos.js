import React from 'react';
import {useCurrentPage} from '../../../../components/Pages/Pages';
import {BasicInfo} from './BasicInfo';

export const BasicInfos = () => {
  const basicInfos = useCurrentPage().basic_infos;

  return (
      <div>
        {basicInfos.map(info => (
            <BasicInfo key={info.id} info={info}/>
        ))}
      </div>
  );
};