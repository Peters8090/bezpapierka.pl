import React, {useContext} from 'react';
import {sentenceCase} from 'change-case';

import {Field, FieldAutoDefaultValueContext} from '../Form/Field/Field';
import type {FieldProps} from '../Form/Field/Field';
import {TranslationContext} from '../Translation/Translation';

interface CRUDFieldProps extends FieldProps {
  label?: string,
}

export const CRUDField = (props: CRUDFieldProps) => {
  const fieldAutoDefaultValueContext = useContext(FieldAutoDefaultValueContext);
  const _ = useContext(TranslationContext).gettextDjango;

  return (
      <Field
          resetValueAfterSubmit={!fieldAutoDefaultValueContext.provideDefaultValue} {...props}
          defaultValue={fieldAutoDefaultValueContext.provideDefaultValue
              ? fieldAutoDefaultValueContext.root[props.apiName]
              : props.defaultValue} label={_([sentenceCase(props.apiName)])}>
        {props.children}
      </Field>
  );
};