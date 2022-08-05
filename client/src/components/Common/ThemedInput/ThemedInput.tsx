import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Controller, Path, PathValue, UseControllerProps, UseFormReturn } from 'react-hook-form'



interface ThemedInputProps<T> {
   form: UseFormReturn<T>
   name: Path<T>
   rules?: UseControllerProps['rules']
   defaultValue?: PathValue<T, Path<T>>
   handleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function ThemedInput<T>({ 
   form,
   name,
   defaultValue,
   rules,
   className,
   label,
   handleChange,
   ...props
}: ThemedInputProps<T> & TextFieldProps) { 
   const { control } = form

   return(
         <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({
               field: { onChange, onBlur, value, name, ref },
               fieldState: { invalid, error },
            }) => (
                  <TextField
                  className={className}
                  label={label}
                  onChange={(value) => {
                     onChange(value)
                     handleChange?.(value)
                  }}
                  autoComplete="false"
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  inputRef={ref}
                  error={invalid}
                  helperText={error?.message || ''}
                  fullWidth
                  {...props}
               />
                 
            )}
   />
   )
}
