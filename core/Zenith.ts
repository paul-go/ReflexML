
/**
 * Global library object.
 */
const ml = Reflex.Core.createLeafNamespace<ReflexML.Namespace, ReflexML.Library>(
	new ReflexML.Library(),
	true);

//@ts-ignore
typeof module === "object" && (module.exports = { ReflexML, ml });
