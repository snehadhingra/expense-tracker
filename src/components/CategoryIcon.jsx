import PropTypes from "prop-types";

const ICONS = {
  Food: "🍽",
  Transport: "🚗",
  Shopping: "🛍",
  Health: "💊",
  Bills: "📄",
  Entertainment: "🎬",
  Other: "📦",
};

export default function CategoryIcon({ category }) {
  return <span>{ICONS[category] || "📦"}</span>;
}

CategoryIcon.propTypes = {
  category: PropTypes.string.isRequired,
};
