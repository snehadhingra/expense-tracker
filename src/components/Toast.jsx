import PropTypes from "prop-types";
import { styles } from "../styles/styles";

export default function Toast({ message }) {
  return <div style={styles.successToast}>✓ {message}</div>;
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
};
