import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../../../App';
import {Field} from './Field';

export const FieldAutoDefaultValueContext = React.createContext({
  provideDefaultValue: false,
  root: {},
});

export const FieldAutoDefaultValue = withRouter(props => {
  const fieldAutoDefaultValueContext = useContext(FieldAutoDefaultValueContext);

  return (
      <Field defaultValue={fieldAutoDefaultValueContext.provideDefaultValue
          ? fieldAutoDefaultValueContext.root[props.apiName]
          : undefined} {...props}>
        {props.children}
      </Field>
  );
});
FieldAutoDefaultValue.propTypes = Field.propTypes;