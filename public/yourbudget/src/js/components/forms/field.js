import TextField from './textfield';
import PasswordField from './passwordfield';
import DateField from './datefield';
import ToggleSwitchField from './toggleswitchfield';


const meta = { pristine: true, touched: false, changed: false, submitted: false, error: '', };


const Field = ({ name, initialValue, type, placeholder, onValue, offValue, }) => {
  const commonProps = {
    type,
    name,
    initialValue,
  };
  switch (type) {
    case 'text':
      return { Element: TextField, props: {
          ...commonProps,
          placeholder,
          meta,
        }
      }
    case 'password':
      return { Element: PasswordField, props: {
          ...commonProps,
          placeholder,
          meta,
        }
      }
    case 'date':
      return { Element: DateField, props: {
          ...commonProps,
          meta,
        }
      }
    case 'toggle':
      return { Element: ToggleSwitchField, props: {
          ...commonProps,
          onValue,
          offValue,
        }
      }
    default: throw new Error(`No such form field type: ${type}`);
  }
}


export default Field;
