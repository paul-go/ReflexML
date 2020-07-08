
namespace Cover
{
	/** */
	export function coverNesting()
	{
		let val = false;
		
		return ml.div(
			ml.h1(ml`Before Everything`),
			
			once("dblclick", () =>
			{
				return [
					ml.h2(ml`Added On Double Click (Goes Before)`),
					on("click", () =>
					{
						return (val = !val) ?
							ml.h3(ml`Flip On Click (true)`) : 
							ml.h4(ml`Flip On Click (false)`);
					}),
					ml.h5(ml`Added On Double Click (Goes After)`)
				];
			}),
			
			ml.h6(ml`After Everything`)
		);
	}
	
	/** */
	export function coverAttributes()
	{
		return ml.div(
			ml`This input should have a maximum length of 5 characters`,
			
			ml.inputText({
				maxLength: 5,
				placeholder: "Type stuff here"
			})
		);
	}
	
	/** */
	export function coverClosures()
	{
		return [
			ml.div(
				ml`Before`,
				(e, children) =>
				{
					return ml.div(ml`From Closure`);
				},
				ml`After`
			)
		];
	}
	
	/** */
	export function coverComplexClosures()
	{
		return [
			ml.section(
				"d0",
				[[[ml.b("d1")]]],
				[[ml.u("d2")]],
				[ml.i("d3")],
				(e, children) =>
				{
					return ml(children.length === 3 ? "PASS" : "FAIL");
				}
			)
		];
	}
	
	/** */
	export function coverManyLevels()
	{
		return ml.div(
			[[[""]]],
			[""],
			e => [
				ml.span(ml`(1)`),
				ml.span(ml`(2)`)
			]
		);
	}
	
	/** */
	export function coverOnce()
	{
		return ml.div(
			ml`Click and the text "Clicked" should be inserted. Should only work once.`,
			ml.br(),
			once("click", ev =>
			{
				return ml`Clicked`;
			}),
		);
	}
	
	/** */
	export function coverMultipleSelectors()
	{
		debugger;
		let value = 0;
		
		return ml.div(
			ml`The number below should increment on mouseup and mousedown`,
			ml.br(),
			
			on(["mouseup", "mousedown"], () =>
			{
				alert("Asdf");
				debugger;
				
				//return ml((++value).toString());
				return "";
			}).run()
		);
	}
	
	/** */
	export function coverOnly()
	{
		return ml.div(
			ml`Outer`,
			only("click", () =>
			{
				alert("Should be called");
			}),
			ml.div(
				ml`Inner`,
				on("click", () =>
				{
					alert("Should NOT be called.");
				})
			)
		);
	}
	
	/** */
	export function coverStatelessForces()
	{
		const greet = force<(name: string) => void>();
		
		return ml.div(
			ml.button(
				ml`Greet`,
				on("click", () =>
				{
					greet("Paul");
				})
			),
			ml.p(
				on(greet, name => ml`Hello ${name}.`)
			),
			on(greet, name => alert(`Hello ${name}.`))
		);
	}
	
	/** */
	export function coverStatefulForces()
	{
		const flag = force(false);
		
		return ml.div(
			// Effects that store a boolean value are given an additional 
			// method called .flip() to toggle it's internal value:
			on("click", () => flag.flip()),
			on(flag, () => flag.value ? "wide" : "narrow"),
			ml`Hello`
		);
	}
	
	/** */
	export function coverCustomEvents()
	{
		const fx = force<(str: string, num: number) => void>();
		
		return ml.div(
			on("click", () =>
			{
				fx("str", Math.random());
			}),
			on(fx, (str, num) =>
			{
				return num > 0.5 ? "red" : "blue";
			}).run("a", 0.75),
			
			ml`Events test. Click this. It should randomly switch between red and blue`
		);
	}
	
	/** */
	export function coverInterpolation()
	{
		return ml.div(ml`${ml.span(ml`(span 1)`)} (not span 1) ${ml.span(ml`(span 2)`)} (not span 2)`);
	}
	
	/** */
	export function coverElementChildren()
	{
		const s = ml.div(ml`1`);
		const a: Reflex.Atom = s;
		
		return ml.div(
			ml`Click to delete from the bottom`,
			ml.div(ml`1`),
			ml.div(ml`2`),
			ml.div(ml`3`),
			ml.div(ml`4`),
			ml.div(ml`5`),
			ml.div(ml`6`),
			(e, children) => on("click", () =>
			{
				children.pop();
			})
		);
	}

	/** */
	export function coverBasicValueStreaming()
	{
		let isDark = false;
		
		return ml.div(
			"faded",
			ml`Click to toggle the class between dark and not dark.`,
			on("click", () => (isDark = !isDark) ? "dark" : "")
		);
	}
	
	/** */
	export function coverImmediateValueStreaming()
	{
		let isDark = false;
		
		return ml.div(
			"faded",
			ml`Click to toggle the class between blue and green.`,
			ml.br(),
			ml`(Should start as blue)`,
			on("click", () => (isDark = !isDark) ? "blue" : "green").run()
		);
	}
	
	/** */
	export function coverImmediateValueStreamingOnForce()
	{
		const randomForClick = force(makeString());
		const randomForHover = force(makeString());
		
		return ml.div(
			ml`Click or hover to change the random number below.`,
			ml.br(),
			on([randomForClick, randomForHover], now =>
			{
				return ml(now);
			}).run(),
			
			// NOTE: You could actually do this by just returning the makeString()
			// content and omitting this line, but this is for cover purposes only.
			on(["click", "mousemove"], () =>
			{
				randomForClick.set(makeString());
			})
		);
	}
	
	/** */
	export function coverChangingContentsOnForce()
	{
		const value = force(false);
		
		return ml.div(
			ml`Click to toggle the rendering between red and blue.`,
			ml.br(),
			ml`The default should be red`,
			ml.br(),
			on(value, now =>
			{
				return now ?
					ml.div("red", ml`Value is true`) :
					ml.div("blue", ml`Value is false`);
			}).run(),
			
			on("click", () =>
			{
				value.flip();
			})
		);
	}
	
	/** */
	export function coverForceBackedTextNode()
	{
		const valueFo = force("A");
		
		const text = ml`Hello`;
		const textNode = ml(valueFo);
		
		return ml.div(
			textNode,
			ml.button(
				ml`Flip between A and B`,
				on("click", () =>
				{
					valueFo.value = valueFo.value === "A" ? "B" : "A";
				})
			)
		);
	}
	
	/** */
	export function coverPromises()
	{
		return ml.div(
			ml.p(ml`Before`),
			new Promise(resolve =>
			{
				// Do some async stuff here
				resolve(ml.p(ml`In between`));
			}),
			ml.p(ml`After`)
		);
	}
	
	/** */
	export function coverTransitions()
	{
		let wide = false;
		
		return ml.div(
			`transition`,
			ml`Click on this element to expand and contract it.`,
			on("click", () => (wide = !wide) ? "wide" : "narrow").run()
		);
	}
	
	/** */
	export function coverIterators()
	{
		return ml.div(
			ml`There should be 3 items below this.`,
			function*()
			{
				for (let i = 0; i < 3; i++)
				{
					yield ml.div(
						`green`,
						ml(makeString())
					);
				}
			},
			ml`And nothing below this`
		);
	}
	
	/** */
	export function coverAsyncIteratorsSimple()
	{
		const wait = () => new Promise(r => setTimeout(r));
		
		return ml.div(
			async function*(e, children)
			{
				await wait();
				yield ml.div("red", ml`RED`);
				
				yield function*(e, children)
				{
					yield ml.div("green", ml`GREEN`);
				};
				
				yield ml.div("blue", ml`BLUE`);
			}
		);
	}
	
	/** */
	export function coverAsyncIteratorsComplex()
	{
		const wait = () => new Promise(r => setTimeout(r));
		
		return ml.div(
			ml`There shouldn't be anything above this.`,
			async function*(e, children)
			{
				await wait();
				yield ml.div(`purple`, ml("(Must be first div) " + makeString()));
				yield ml`(Begin nested stream)`;
				yield ml.hr();
				
				yield async function*(e, children)
				{
					await wait();
					yield ml.div(`red`, ml("Red Nested " + makeString()));
					await wait();
					yield ml.div(`green`, ml("Green Nested " + makeString()));
					await wait();
					yield ml.div(`blue`, ml("Blue Nested " + makeString()));
				};
				
				yield ml`(End nested stream)`;
				await wait();
				yield ml.div(`orange`, ml("(Must be last div) Orange " + makeString()));
			},
		);
	}
	
	/** */
	export function coverRefreshMultipleForces()
	{
		const fx1 = force();
		const fx2 = force();
		
		setTimeout(() =>
		{
			// Wait 10ms before calling fx1
			fx1();
		},
		10);
		
		return ml.div(
			on([fx1, fx2], () => [
				ml`Click on this element refresh it, and get another random number generated.
					Also, you should get another number generated on the mouseenter event.`,
				
				ml(makeNumber()),
				on("click", () => fx1())
			]).run()
		);
	}
	
	/** */
	export function coverArrayForce()
	{
		class Widget { constructor(readonly size: number) { } }
		const w1 = new Widget(1);
		const w2 = new Widget(2);
		const w3 = new Widget(3);
		const widgetsFo = force([w1, w2, w3]);
		
		return ml.div(
			ml.button(
				ml`Splice`,
				on("click", () =>
				{
					widgetsFo.splice(1, 0, new Widget(Math.round(Math.random() * 100)));
				})
			),
			ml.button(
				ml`Shift`,
				on("click", () =>
				{
					widgetsFo.shift();
				})
			),
			ml.button(
				ml`Pop`,
				on("click", () =>
				{
					widgetsFo.pop();
				})
			),
			on(widgetsFo, widget =>
			{
				return ml.div(ml(widget.size.toString()));
			})
		);
	}
	
	/** */
	export function coverArrayForcesComplex()
	{
		const list = force([6, 3, 8]);
		const sortFlip = force(false);
		const sortSwitch = force(false);
		const full = force(true);
		
		return ml.div(
			ml.button(
				ml`Add`,
				on("click", () => void list.push(Math.round(Math.random() * 9)))
			),
			ml.button(
				ml`Remove`,
				on("click", () => void list.pop())
			),
			ml.button(
				ml`Switch Filter`,
				on("click", () => full.flip())
			),
			ml.button(
				ml`Switch Sort`,
				on("click", () => sortSwitch.flip())
			),
			ml.button(
				ml`Flip Sorting`,
				on("click", () => sortFlip.flip())
			),
			on(list
				.filter(v =>
				{
					return full.value ?
						true :
						v > 5;
				}, full)
				
				.sort((a, b) =>
				{
					if (sortSwitch.value)
						return sortFlip.value ? b - a : a - b;
					
					return 0;
					
				}, sortSwitch, sortFlip),
				
				num => ml.div(ml(num)))
		);
	}
	
	/** */
	export function coverValueBinding()
	{
		const backing = force("Change this text");
		
		const array = [
			ml`Type in the text box below and it should sync with the div below. `,
			ml.br(),
			ml`Clicking the containing div should reset everything.`,
			ml.br(),
			ml.br(),
			
			on("click", ev =>
			{
				if (ev.target instanceof HTMLInputElement)
					return;
				
				backing.value = makeString();
			}),
			
			ml.br(),
			ml`The value is: ${backing}`,
			ml.br(),
			
			ml.inputText(
				"textbox-1",
				ml.bind(backing)
			),
			
			ml.br(),
			
			ml.inputText(
				"textbox-2",
				ml.bind(backing)
			)
		];
		
		return ml.div(...array);
	}
	
	/** */
	export function coverSymbolicAtomTypes()
	{
		class CustomSymbolic
		{
			constructor(private readonly content: string) { }
			
			[Reflex.atom](e: HTMLElement, children: ReflexML.Atom[])
			{
				return ml.div([
					ml(this.content),
					ml.br(),
					ml(
						"Passed in destination should be an HTMLElement, and it is: " +
						e.constructor.name)
				])
			}
		}
		
		return ml.div(
			() => ml.div(ml`Should be before.`),
			new CustomSymbolic("Atomized!"),
			() => ml.div(ml`Should be after.`),
		);
	}
	
	/** */
	export function coverForceReturners()
	{
		const fo = force(0).return((now, was) => now % 2 === 0 ? now : was);
		const numbers: number[] = [];
		
		for (let i = -1; ++i < 20;)
		{
			fo.value = i;
			
			if (!numbers.includes(fo.value))
				numbers.push(fo.value);
		}
		
		return ml.div(
			ml("Should only have even numbers: "),
			ml.br(),
			ml(numbers.join())
		);
	}
	
	/** */
	export function coverForceWatchers()
	{
		const stringFo = force("");
		const numFo = force(0).watch((now, was) =>
			stringFo.value = "The number is: " + now);
		
		return ml.div(
			ml.button(
				on("click", () =>
				{
					numFo.value++;
				}),
				ml`Click this button to indirectly change the string force.`
			),
			on(stringFo, now =>
			{
				return ml(now);
			})
		);
	}
	
	/** * /
	export function coverMutationWatcher()
	{
		const elementVisible = force(false);
		const contentVisible = force(false);
		const invoked: string[] = [];
		
		function invoke(message: string)
		{
			if (invoked.length === 0)
			{
				setTimeout(() => 
				{
					alert("Triggered:\r\n\r\n" + invoked.join("\n"));
					invoked.length = 0;
				});
			}
			
			invoked.push(message);
		}
		
		return ml.div(
			ml.div(
				"Mutation-Buttons",
				ml`Test the mutation watchers. Click one of the buttons, and
					a message will display that indicates which mutation callback
					functions were invoked.`,
				ml.br(),
				
				ml.button(
					ml`Toggle Element`,
					on("click", () => elementVisible.flip())
				),
				ml.button(
					ml`Toggle Content`,
					on("click", () => contentVisible.flip())
				)
			),
			
			ml.div(
				"Mutation-Results",
				
				() =>
				{
					return on(elementVisible, visible =>
					{
						return visible && ml.div(ml(makeString()));
					});
				},
				
				on(contentVisible, visible => visible && ml(makeString())),
				
				on(ml.mutation, (kind, e) =>
				{
					invoke("ml.mutation");
				}),
				
				on(ml.mutation.element, (kind, e) =>
				{
					invoke("ml.mutation.element: " + e.textContent);
				}),
				
				on(ml.mutation.elementAdd, e =>
				{
					invoke("ml.mutation.elementAdd: " + e.textContent);
				}),
				
				on(ml.mutation.elementRemove, e =>
				{
					invoke("ml.mutation.elementRemove: " + e.textContent);
				}),
				
				on(ml.mutation.content, (kind, text) =>
				{
					invoke("ml.mutation.content: " + text.textContent);
				}),
				
				on(ml.mutation.contentAdd, text =>
				{
					invoke("ml.mutation.contentAdd: " + text.textContent);
				}),
				
				on(ml.mutation.contentRemove, text =>
				{
					invoke("ml.mutation.contentRemove: " + text.textContent);
				})
			)
		);
	}
	
	/** * /
	export function coverHeadElements()
	{
		let styleTag: HTMLStyleElement;
		
		ml.script("asdf");
		
		const code = ml.code(
			ml.meta("viewport", "initial-scale=1.0"),
			ml.styleSheet("http://bogus.testurl/style.css"),
			ml.script("http://bogus.testurl/script.js"),
			ml.script(() =>
			{
				console.log("Script text here");
			}),
			styleTag = ml.styleSheet({
				".head-elements-test CODE": {
					display: "block",
					padding: "15px",
					fontFamily: "Courier New",
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					whiteSpace: "pre",
					overflow: "auto"
				}
			},
			true)
		);
		
		const htmlText = code.innerHTML.replace(/></, ">\n<");
		
		return ml.div(
			ml`This DIV should have <head> section content inside of it`,
			"head-elements-test",
			styleTag,
			ml.code(ml(htmlText))
		);
	}
	
	/** * /
	export function coverScrolling()
	{
		return ml.div(
			{
				style: 
					"width: 100px;" +
					"height: 100px;" +
					"overflow: scroll;" +
					"border: 1px solid black; " +
					"padding: 5px"
			},
			on("wheel", (ev, e) =>
			{
				const absX = Math.abs(ev.deltaX);
				const absY = Math.abs(ev.deltaY);
				let left = 0;
				let top = 0;
				
				if (absX >= absY * 5)
					left = ev.deltaX;
				else
					top = ev.deltaY;
				
				e.scrollBy({ left, top });
				ev.preventDefault();
			}),
			ml.div(
				ml(" x ".repeat(5000)),
				{ style: "width: 500px" }
			)
		);
	}
	*/
	
	/** */
	export function coverCustomBranch()
	{
		class CustomBranch extends HTMLElement
		{
			constructor(n: number)
			{
				super();
			}
		}
		customElements.define("custom-branch", CustomBranch);
		
		const custom = ml.new(CustomBranch, 0)(
			"class-name"
		);
		
		return [
			() => custom.className === "class-name"
		];
	}
	
	/** */
	export function coverImportBranch()
	{
		const body = ml.import(document.body)(
			"class-name"
		);
		
		return [
			() => body === document.body,
			() => document.body.className === "class-name"
		];
	}
}
