
namespace Cover
{
	/** */
	export function makeNumber()
	{
		return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	}
	
	/** */
	export function makeString()
	{
		return makeNumber().toString(36);
	}
}
