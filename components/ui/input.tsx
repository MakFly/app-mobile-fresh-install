import { cn } from '@/lib/utils';
import { Platform, TextInput, type TextInputProps } from 'react-native';

function Input({ className, ...props }: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'border-input bg-background text-foreground flex h-10 w-full rounded-md border px-3 py-1 text-base shadow-sm shadow-black/5',
        props.editable === false && 'opacity-50',
        Platform.select({ native: 'placeholder:text-muted-foreground/50' }),
        className
      )}
      {...props}
    />
  );
}

export { Input };
