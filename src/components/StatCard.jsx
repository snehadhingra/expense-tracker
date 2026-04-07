import PropTypes from "prop-types";
import { styles } from "../styles/styles";

export default function StatCard({ label, value, sub, color }) {
  return (
    <div style={styles.statCard(color)}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      {sub && <div style={styles.statSub}>{sub}</div>}
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sub: PropTypes.string,
  color: PropTypes.string.isRequired,
};
