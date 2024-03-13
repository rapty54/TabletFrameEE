ControlObject = ( function(){
	function ControlObject( params ){
	}
	ControlObject.prototype = {
		onDragStart : function( params ){

		},
		onDragContinue : function( params ){

		},
		onDragEnd : function( params ){

		},
		draw : function( ctx ){

		}
	}
	return ControlObject;
} )();

ControlObjectEraser = ( function(){
	function ControlObjectEraser( params ){
		ControlObject.call( this, params );
	}
	var parent = ControlObject.prototype;
	_obj.util.inherit( ControlObjectEraser, ControlObject, {
		onDragStart : function( params ){

		},
		onDragContinue : function( params ){

			var context = params.context;

			var list = context.getDrawingObjectList();
			if( _obj.util.isEmpty( list ) ){
				return;
			}

			var pt = context.toPagePt( params.eventPt );
			for( var i = 0, ii = list.length; i < ii; i++ ){
				var drawingObject = list[ i ];

				try{
					if( drawingObject.hittest( pt ) ){
						context.removeDrawingObjectFromList( drawingObject );
					}
				}catch( e ){
					console.error( e );
				}
			}

		},
		onDragEnd : function( params ){
			this.onDragContinue( params );
		}
	} );
	return ControlObjectEraser;
} )();

ControlObjectSelector = ( function(){
	function ControlObjectSelector( params ){
		ControlObject.call( this, params );

		this.transformTarget = null;
		this.transformType = DrawingObject.TRANSFORMING_TYPE_NONE;
		this.draggingPrevPagePt = null;
	}
	var parent = ControlObject.prototype;
	_obj.util.inherit( ControlObjectSelector, ControlObject, {
		onDragStart : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;
			var pagePt = context.toPagePt( eventPt );
			var selected = context.getSelected();
			if( selected !== null ){
				var transformType = selected.hitTestTransformCursor( pagePt );
				if( transformType !== DrawingObject.TRANSFORMING_TYPE_NONE ){
					this.transformTarget = selected;
					this.transformType = transformType;
				}
			}

		},
		onDragContinue : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;
			var pagePt = context.toPagePt( eventPt );
			
			if( this.transformTarget !== null ){

				if( !this.draggingPrevPagePt ){

					context.modifyDrawingObjectInList(
						this.transformTarget,
						function( converted ){
							this.transformTarget = converted;
						}.bind( this ),
						false
					);

				}else{

					var pagePtPrev = this.draggingPrevPagePt;

					var headAndTail = function(){
						return new Array( this.transformTarget.head, this.transformTarget.tail );
					}.bind( this );

					var applyBoxTransform = function( fromRect, toRect ){
						if( _obj.util.isAssigned( this.transformTarget.rect ) ){
							this.transformTarget.rect = toRect;
						}
						if( _obj.util.isAssigned( this.transformTarget.vertices ) ){
							this.transformTarget.vertices = _obj.util.graphics.calculateBoxTransformForInnerPts( fromRect, toRect, this.transformTarget.vertices );
						}
						if( _obj.util.isAssigned( headAndTail() ) ){
							var newPts = _obj.util.graphics.calculateBoxTransformForInnerPts( fromRect, toRect, headAndTail() );
							this.transformTarget.head = newPts[ 0 ];
							this.transformTarget.tail = newPts[ 1 ];
						}
					}.bind( this );

					var byX = pagePt.x - pagePtPrev.x;
					var byY = pagePt.y - pagePtPrev.y;

					var fromRect = this.transformTarget.getBounds( 1 );
					var toRect = _obj.Rect.fromRect( fromRect );

					if( this.transformType === DrawingObject.TRANSFORMING_TYPE_MOVE ){
						toRect.left += byX;
						toRect.top += byY;
						toRect.right += byX;
						toRect.bottom += byY;

						applyBoxTransform( fromRect, toRect );

					}else{
						var limit = 20;
						if( toRect.right + byX - limit > toRect.left ){
							toRect.right += byX;
						}
						if( toRect.bottom + byY - limit > toRect.top ){
							toRect.bottom += byY;
						}

						applyBoxTransform( fromRect, toRect );

					}
				}



			}

			this.draggingPrevPagePt = pagePt;

		},
		onDragEnd : function( params ){

			var context = params.context;

			if( this.transformTarget === null ){
				var list = context.getSelectableDrawingObjectList();
				if( _obj.util.isAssigned( list ) ){

					var pt = context.toPagePt( params.eventPt );
					var newSelect = false;
					for( var i = 0, ii = list.length; i < ii; i++ ){
						var drawingObject = list[ i ];
						if( drawingObject.hittest( pt ) ){
							context.select( drawingObject );
							newSelect = true;
							break;
						}
					}
					if( !newSelect ){
						context.deselect();
					}

					if( context.deselectedObjectActionListener ){
						context.deselectedObjectActionListener();
					}

				}

			}else{

				if( this.draggingPrevPagePt === null ){
					if( context.selectedObjectActionListener ){
						context.selectedObjectActionListener( params.eventPt, this.transformTarget );
					}
				}

			}

			this.transformTarget = null;
			this.transformType = DrawingObject.TRANSFORMING_TYPE_NONE;
			this.draggingPrevPagePt = null;

		}
	} );
	return ControlObjectSelector;
} )();

DrawingObject = ( function(){
	function DrawingObject( params ){

		this.paintOption = params.paintOption !== undefined ? params.paintOption : new DrawingObjectLayer.PaintOption( {} );

	}
	DrawingObject.SELECTION_HANDLE_SIZE = 6;
	DrawingObject.SELECTION_HANDLE_STROKE_STYLE = 'rgba( 255, 0, 0, 1 )';
	DrawingObject.TRANSFORM_CURSOR_HIT_DIST = 20;
	DrawingObject.TRANSFORMING_TYPE_NONE = -1;
	DrawingObject.TRANSFORMING_TYPE_MOVE = 0;
	DrawingObject.TRANSFORMING_TYPE_SCALE_RIGHT_BOTTOM = 1;
	DrawingObject.prototype = {
		onDragStart : function( params ){
		},
		onDragContinue : function( params ){
		},
		onDragEnd : function( params ){
		},
		draw : function( ctx ){

		},
		drawSelection : function( ctx, scale ){
			var r = this.getBounds( scale );
			ctx.beginPath();
			ctx.rect( r.left, r.top, r.width, r.height );

			var handles = this.getTransformHandlePts( scale );

			var d = DrawingObject.SELECTION_HANDLE_SIZE;
			for( var i = 0, ii = handles.length; i < ii; i++ ){
				var hPt = handles[ i ];
				ctx.moveTo( hPt.x + d, hPt.y );
				ctx.arc( hPt.x, hPt.y, d, 0, 2 * Math.PI, true );
			}
			ctx.strokeStyle = DrawingObject.SELECTION_HANDLE_STROKE_STYLE;
			ctx.stroke();
		},
		hittest : function( pt ){
			return _obj.util.hitTest( this.getBounds( 1 ), pt );
		},
		getBounds : function( scale ){
			return this.rect ? _obj.Rect.scaledRect( this.rect, scale ) : null;
		},
		isSelectable : function(){
			return true;
		},
		isPositionAdjustable : function(){
			return true;
		},
		isScaleAdjustable : function(){
			return true;
		},
		hitTestTransformCursor : function( pagePt ){

			var r = this.getBounds( 1 );

			var rtn = DrawingObject.TRANSFORMING_TYPE_NONE;

			if( rtn == DrawingObject.TRANSFORMING_TYPE_NONE && ( r.width < DrawingObject.TRANSFORM_CURSOR_HIT_DIST * 2 || r.height < DrawingObject.TRANSFORM_CURSOR_HIT_DIST * 2 ) ){
				if( r.hitTest( pagePt ) ){
					rtn = DrawingObject.TRANSFORMING_TYPE_MOVE;
				}
			}

			if( rtn == DrawingObject.TRANSFORMING_TYPE_NONE && this.isScaleAdjustable() ){
				if( _obj.util.distance( pagePt, new _obj.Point( r.right, r.bottom ) ) <= DrawingObject.TRANSFORM_CURSOR_HIT_DIST ){
					rtn = DrawingObject.TRANSFORMING_TYPE_SCALE_RIGHT_BOTTOM;
				}
			}

			if( rtn == DrawingObject.TRANSFORMING_TYPE_NONE && this.isPositionAdjustable() ){
				if( r.hitTest( pagePt ) ){
					rtn = DrawingObject.TRANSFORMING_TYPE_MOVE;
				}
			}
			return rtn;
		},
		getTransformHandlePts : function( scale ){
			var r = this.getBounds( scale );
			var rtn = [];
			if( this.isScaleAdjustable() ){
				rtn.push( new _obj.Point( r.right, r.bottom ) );
			}
			return rtn;
		}
	}
	return DrawingObject;
} )();

DrawingObjectFreeLine = ( function(){
	function DrawingObjectFreeLine( params ){
		DrawingObject.call( this, params );

		this.type = DrawingObjectFreeLine.TYPE;
		this.pts = new Array();
		this.rect = null;
	}
	DrawingObjectFreeLine.TYPE = 'FreeLine';
	var parent = DrawingObject.prototype;
	_obj.util.inherit( DrawingObjectFreeLine, DrawingObject, {

		onDragStart : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;

			this.pts.push( context.toPagePt( eventPt ) );
		},
		onDragContinue : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;

			this.pts.push( context.toPagePt( eventPt ) );
		},
		onDragEnd : function( params ){

			var context = params.context;
			if( this.pts.length > 1 ){
				this.rect = _obj.Rect.fromPts( this.pts );
				context.addNewDrawingObjectToList( this );
			}
		},
		filterAlpha : function( a ){
			return a;
		},
		draw : function( ctx ){

			if( this.pts.length < 2 ){
				return;
			}

			var p1 = this.pts[ 0 ];
			var p2 = this.pts[ 1 ];
			ctx.beginPath();
			ctx.moveTo( p1.x, p1.y );
			for( var k = 1, kk = this.pts.length; k < kk; k++ ){
				var midPt = _obj.util.midPoint( p1, p2 );
				ctx.quadraticCurveTo( p1.x, p1.y, midPt.x, midPt.y );
				p1 = this.pts[ k ];
				p2 = this.pts[ k + 1 ];

			}
			ctx.lineTo( p1.x, p1.y );


			var po = this.paintOption;
			var alpha = this.filterAlpha( po.alpha );
			var rgba = alpha >= 1 ? po.rgb : _obj.util.hexColorToRgba( po.rgb, alpha );

			ctx.lineWidth = po.lineWidth;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.strokeStyle = rgba;
			ctx.stroke();
		},
		hittest : function( pt ){

			if( this.pts.length < 2 ){
				return;
			}

			for( var i = 1, ii = this.pts.length; i < ii; i++ ){
				var p1 = this.pts[ i - 1 ];
				var p2 = this.pts[ i ];
				if( _obj.util.collision.calcIsInsideThickLineSegment( p1, p2, pt, 3 ) ){
					return true;
				}
			}
			return false;

		},
		isSelectable : function(){
			return false;
		},


	} );
	return DrawingObjectFreeLine;
} )();


DrawingObjectTransparentFreeLine = ( function(){
	function DrawingObjectTransparentFreeLine( params ){
		DrawingObjectFreeLine.call( this, params );

		this.type = DrawingObjectTransparentFreeLine.TYPE;
	}
	DrawingObjectTransparentFreeLine.TYPE = 'TransparentFreeLine';
	var parent = DrawingObjectFreeLine.prototype;
	_obj.util.inherit( DrawingObjectTransparentFreeLine, DrawingObjectFreeLine, {

		filterAlpha : function( a ){
			return a / 2;
		}

	} );
	return DrawingObjectTransparentFreeLine;
} )();

DrawingObjectTextbox = ( function(){

	var lastComplete = 0;

	function DrawingObjectTextbox( params ){
		DrawingObject.call( this, params );

		this.type = DrawingObjectTextbox.TYPE;
		this.fromPt = null;
		this.rect = null;
		this.writing = null;

		this.contentPadding = 0;
		this.content = '';
	}
	DrawingObjectTextbox.TYPE = 'Textbox';
	var parent = DrawingObject.prototype;
	_obj.util.inherit( DrawingObjectTextbox, DrawingObject, {

		onDragStart : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;
			this.fromPt = context.toPagePt( eventPt );
		},
		onDragContinue : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;
			var pt1 = this.fromPt;
			var pt2 = context.toPagePt( eventPt );

			this.rect = _obj.Rect.fromPts( new Array( pt1, pt2 ) );

		},
		onDragEnd : function( params ){

			var context = params.context;
			var eventPt = params.eventPt;

			if( _obj.util.isMobile.iOS() ){

				if( this.rect ){
					this.edit( context, function(){
						if( _obj.util.isAssigned( this.content ) ){
							context.addNewDrawingObjectToList( this );
							context.updateDrawing();
						}
					}.bind( this ) );
					this.fromPt = null;
				}

			}else{
				setTimeout( function(){

					if( new Date().getTime() - lastComplete > 1000 ){

						if( !this.rect ){
							this.rect = new _obj.Rect( this.fromPt.x, this.fromPt.y, this.fromPt.x + 300, this.fromPt.y + 150 );
						}

						this.edit( context, function(){
							if( _obj.util.isAssigned( this.content ) ){
								context.addNewDrawingObjectToList( this );
								context.updateDrawing();
							}
						}.bind( this ) );
						this.fromPt = null;
					}

				}.bind( this ), 100 );
			}

		},
		draw : function( ctx ){
			if( this.writing || !this.rect ){
				return;
			}

			var rw = this.rect.right - this.rect.left;
			var rh = this.rect.bottom - this.rect.top;
			var padding = this.contentPadding;
			var prw = rw - padding * 2;
			var prh = rh - padding * 2;

			var po = this.paintOption;
			var rgba = po.alpha >= 1 ? po.rgb : _obj.util.hexColorToRgba( po.rgb, po.alpha );

			ctx.font= po.fontSize + 'px ' + po.fontFamily;
			ctx.textAlign = 'start';
			ctx.textBaseline = 'top';

			var text = this.content;
			var lines = _obj.util.wrappedText( ctx, text, prw );

			if( this.fromPt ){
				ctx.beginPath();
				ctx.rect( this.rect.left, this.rect.top, this.rect.right - this.rect.left, this.rect.bottom - this.rect.top );
				ctx.strokeStyle = 'red';
				ctx.setLineDash( [ 5, 15 ] );
				ctx.lineWidth = 3;
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.stroke();
			}

			ctx.save();
			ctx.translate( this.rect.left, this.rect.top );
			ctx.beginPath();
			ctx.rect( padding, padding, prw, prh );
			ctx.clip();



			ctx.fillStyle = rgba;

			for( var i = 0, ii = lines.length; i < ii; i++ ){
				ctx.fillText( lines[ i ], padding, padding + i * ( po.fontSize + 2 ) );
			}
			ctx.restore();

		},
		modifyEdit : function( context ){
			context.modifyDrawingObjectInList(
				this,
				function( tgt ){
					context.deselect( true );
					var pc = tgt.content;
					tgt.edit( context, function(){
						context.updateDrawing();
					} );
				},
				true
			);

		},
		edit : function( context, callback ){

			var scale = context.pageScale;

			var ar = new _obj.Rect(
				this.rect.left * scale,
				this.rect.top * scale,
				this.rect.right * scale,
				this.rect.bottom * scale
			);

			var po = this.paintOption;
			var rgba = po.alpha >= 1 ? po.rgb : _obj.util.hexColorToRgba( po.rgb, po.alpha );

			var el = document.createElement( 'textarea' );
			el.style.pointerEvents = 'auto';
			el.style.position = 'absolute';
			el.style.color = rgba;
			if( !this.content ){
				el.style.background = 'transparent';
				//el.textContent = '';
			}else{
				el.style.background = 'white';
				el.textContent = this.content;
			}
			el.style.fontSize = ( po.fontSize * scale ) + 'px';
			el.style.fontFamily = po.fontFamily;
			el.style.border = _obj.util.isMobile.any() ? '1px red solid' : '0px';
			el.style.left = ( context.pageRect.left + ar.left ) + 'px';
			el.style.top = ( context.pageRect.top + ar.top ) + 'px';
			el.style.width = ar.width + 'px';
			el.style.height = ar.height + 'px';
			context.uiDiv.appendChild( el );
			el.focus();
			el.addEventListener( 'blur', function(){
				lastComplete = new Date().getTime();

				this.content = el.value;
				el.parentNode.removeChild( el );
				this.writing = null;

				if( callback ){
					callback();
				}


			}.bind( this ) );
			this.writing = el;
		},
		hittest : function( pt ){
			return _obj.util.hitTest( this.rect, pt );
		}

	} );
	return DrawingObjectTextbox;
} )();

DrawingObjectLayer = ( function(){

	var HISTORY_LIMIT = 20;

	function onTouchStart( event ){

		if( this.isValidForDrawing() ){
			this.touchActivate = true;

			if( this.workingCurrentType ){
				this.workingCurrent = new this.workingCurrentType( {
					paintOption : this.paintOption.clone()
				} );
			}

			if( this.workingCurrent ){
				this.workingCurrent.onDragStart( {
					context : this,
					event : event,
					eventPt : new _obj.Point( event.touches[ 0 ].clientX, event.touches[ 0 ].clientY )
				} );
			}

		}
	}

	function onTouchMove( event ){
		if( this.touchActivate && this.workingCurrent ){
			var eventPt = new _obj.Point( event.touches[ 0 ].clientX, event.touches[ 0 ].clientY );
			this.workingCurrent.onDragContinue( {
				context : this,
				event : event,
				eventPt : eventPt
			} );
			this.lastMovePt = eventPt;
			this.updateDrawing();
		}
	}

	function onTouchEnd( event ){
		if( this.touchActivate && this.workingCurrent ){

			var eventPt = null;
			if( event.touches.length < 1 ){
				eventPt = this.lastMovePt;
			}else{
				eventPt = new _obj.Point( event.touches[ 0 ].clientX, event.touches[ 0 ].clientY );
			}

			this.workingCurrent.onDragEnd( {
				context : this,
				event : event,
				eventPt : eventPt
			} );
		}
		this.touchActivate = false;
		this.workingCurrent = null;
		this.updateDrawing();
	}

	function nextDrawingObjectList(){
		var listNext = new Array();
		if( this.drawingHistory.cursor > -1 ){
			_obj.util.append( listNext, this.drawingHistory.list[ this.drawingHistory.cursor ] );
		}
		return listNext;
	}
	function insertNextDrawingObjectListToHistory( listNext ){
		if( this.drawingHistory.cursor < this.drawingHistory.list.length - 1 ){
			this.drawingHistory.list.splice( this.drawingHistory.cursor + 1, this.drawingHistory.list.length - this.drawingHistory.cursor + 1 );
		}
		this.drawingHistory.list.push( listNext );
		this.drawingHistory.cursor++;

		if( this.drawingHistory.list.length > HISTORY_LIMIT ){
			this.drawingHistory.list.splice( 0, 1 );
			this.drawingHistory.cursor--;
		}
	}

	function notifyObjectChange(){
		if( this.objectChangeListener ){
			this.objectChangeListener();
		}
	}

	//개체선택후 이동,사이즈 변경시
	function newDrawingObject( obj ){
		var typed = new DrawingObjectTextbox( {} );;
		for( var prop in obj ){
			typed[ prop ] = obj[ prop ];
		}
		return typed;
	}

	function DrawingObjectLayer( canvas, uiDiv, paintOption, pageRect, pageScale ){

		this.paintOption = paintOption;

		this.objectChangeListener = null;
		this.selectedObjectActionListener = null;
		this.deselectedObjectActionListener = null;

		this.visible = true;
		this.canvas = canvas;
		this.canvas.style.pointerEvents = 'none';
		this.viewRect = null;
		var updateCanvasSize = function(){
			var cr = this.canvas.getBoundingClientRect();
			this.canvas.width = cr.width;
			this.canvas.height = cr.height;
			this.viewRect = new _obj.Rect( 0, 0, cr.width, cr.height );
			this.updateDrawing();
		}.bind( this );
		updateCanvasSize();
		window.addEventListener( 'resize', updateCanvasSize );

		this.uiDiv = uiDiv;
		this.uiDiv.style.pointerEvents = 'none';
		this.pageRect = pageRect;
		this.pageScale = pageScale;
		this.touchActivate = false;

		this.workingCurrentType = null;
		this.workingCurrent = null;

		this.drawingHistory = {
			list : new Array(),
			cursor : -1
		};

		this.areaTestInPage = null;
		this.areaTestInScreen = null;

		this.lastMovePt = null;
		
		canvas.addEventListener( 'mousedown', function( event ){
			event.touches = [ { clientX : event.clientX, clientY : event.clientY + 49} ];
			onTouchStart.apply( this, [ event ] );
		}.bind( this ) );
		canvas.addEventListener( 'touchstart', function( event ){
			onTouchStart.apply( this, [ event ] );
		}.bind( this ) );

		canvas.addEventListener( 'mousemove', function( event ){
			event.touches = [ { clientX : event.clientX, clientY : event.clientY + 49} ];
			onTouchMove.apply( this, [ event ] );
		}.bind( this ) );
		canvas.addEventListener( 'touchmove', function( event ){
			onTouchMove.apply( this, [ event ] );
			event.preventDefault();
		}.bind( this ) );

		canvas.addEventListener( 'mouseup', function( event ){
			event.touches = [ { clientX : event.clientX, clientY : event.clientY + 49} ];
			onTouchEnd.apply( this, [ event ] );
		}.bind( this ) );
		canvas.addEventListener( 'touchend', function( event ){
			onTouchEnd.apply( this, [ event ] );
		}.bind( this ) );

		var selected = null;

		this.select = function( obj ){
			selected = obj;
		};
		this.deselect = function( redraw ){
			if( !selected ){
				return;
			}
			selected = null;
			if( redraw ){
				this.updateDrawing();
			}
		};
		this.hasSelected = function(){
			return selected != null;
		};
		this.getSelected = function(){
			return selected;
		};

	}
	DrawingObjectLayer.PaintOption = ( function(){
		function PaintOption( params ){
			this.rgb = params.rgb !== undefined ? params.rgb : '#ff0000';
			this.alpha = params.alpha !== undefined ? params.alpha : 1.0;
			this.lineWidth = params.lineWidth !== undefined ? params.lineWidth : 3;
			this.fill = params.fill !== undefined ? params.fill : true;
			this.fontFamily = params.fontFamily !== undefined ? params.fontFamily : 'Nanum Myeongjo';
			this.fontSize = params.fontSize !== undefined ? params.fontSize : 20;
		}
		PaintOption.prototype = {
			clone : function(){
				return new PaintOption( this );
			}
		}
		return PaintOption;
	} )();
	DrawingObjectLayer.prototype = {
		changeVisibility : function( visible ){
			if( visible === this.visible ){
				return;
			}
			this.visible = visible;
			this.updateDrawing();
		},
		activate : function(){
			this.deselect( true );
			this.canvas.style.pointerEvents = 'auto';
			document.body.style.cursor = 'auto';
		},
		setModeFreeLine : function(){
			//this.deselect( true );
			this.deselect( false );
			//document.body.style.cursor = 'crosshair';
			this.workingCurrentType = DrawingObjectFreeLine;
		},
		setModeTransparentFreeLine : function(){
			this.deselect( true );
			document.body.style.cursor = 'crosshair';
			this.workingCurrentType = DrawingObjectTransparentFreeLine;
		},
//		setModeText : function(){
//			this.deselect( true );
//			document.body.style.cursor = 'crosshair';
//			this.workingCurrentType = DrawingObjectTextbox;
//		},
		setModeEraser : function(){
			this.deselect( true );
			document.body.style.cursor = 'crosshair';
			this.workingCurrentType = ControlObjectEraser;
		},
		setModeSelect : function(){
			this.deselect( true );
			document.body.style.cursor = 'default';
			this.workingCurrentType = ControlObjectSelector;
		},
		isValidForDrawing : function(){
			return _obj.util.isAssigned( new Array(
				this.canvas,
				this.pageRect,
				this.pageScale
			) );
		},
		updateViewport : function( pageRect, pageScale ){
			this.pageRect = pageRect;
			this.pageScale = pageScale;

			this.updateDrawing();
		},
		updateDrawing : function(){

			var ctx = this.canvas.getContext( '2d' );
			ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

			if( !this.pageRect || !this.visible ){
				return;
			}

			ctx.save();
			ctx.translate( this.pageRect.left, this.pageRect.top );
			ctx.scale( this.pageScale, this.pageScale );

			if( this.drawingHistory.cursor > -1 ){
				var list = this.drawingHistory.list[ this.drawingHistory.cursor ];
				for( var i = 0, ii = list.length; i < ii; i++ ){
					list[ i ].draw( ctx );
				}
			}

			if( this.workingCurrent ){
				this.workingCurrent.draw( ctx );
			}

			if( this.areaTestInPage ){
				ctx.beginPath();
				ctx.rect( this.areaTestInPage.left, this.areaTestInPage.top, this.areaTestInPage.width, this.areaTestInPage.height );
				ctx.fillStyle = 'rgba( 255, 0, 0, 0.5 )';
				ctx.fill();
			}

			ctx.restore();

			var selected = this.getSelected();
			if( selected !== null ){

				ctx.save();
				ctx.translate( this.pageRect.left, this.pageRect.top );

				selected.drawSelection( ctx, this.pageScale );

				ctx.restore();
			}

			if( this.areaTestInScreen ){
				ctx.beginPath();
				ctx.rect( this.areaTestInScreen.left, this.areaTestInScreen.top, this.areaTestInScreen.width, this.areaTestInScreen.height );
				ctx.strokeStyle = 'rgba( 0, 0, 255, 1 )';
				ctx.lineWidth = 10;
				ctx.stroke();
			}

		},
		getSelectableDrawingObjectList : function(){

			var list = this.getDrawingObjectList();
			if( _obj.util.isEmpty( list ) ){
				return null;
			}

			var rtn = new Array();
			for( var i = 0, ii = list.length; i < ii; i++ ){
				if( list[ i ].isSelectable() ){
					rtn.push( list[ i ] );
				}
			}
			return rtn;

		},
		getDrawingObjectList : function(){
			return this.drawingHistory.cursor > -1 ? this.drawingHistory.list[ this.drawingHistory.cursor ] : null;
		},
		addNewDrawingObjectToList : function( drawingObject ){
			var listNext = nextDrawingObjectList.apply( this, [] );

			listNext.push( drawingObject );

			insertNextDrawingObjectListToHistory.apply( this, [ listNext ] );
			notifyObjectChange.apply( this, [] );
		},
		removeDrawingObjectFromList : function( drawingObject ){

			var listNext = nextDrawingObjectList.apply( this, [] );

			for( var i = 0, ii = listNext.length; i < ii; i++ ){
				if( listNext[ i ] === drawingObject ){
					listNext.splice( i, 1 );
					break;
				}
			}

			insertNextDrawingObjectListToHistory.apply( this, [ listNext ] );
			notifyObjectChange.apply( this, [] );
		},
		removeAllDrawingObjectFromList : function( redraw ){

			if( this.drawingHistory.cursor < 0 || this.drawingHistory.list[ this.drawingHistory.cursor ].length < 1 ){
				return;
			}

			var listNext = nextDrawingObjectList.apply( this, [] );

			listNext.splice( 0, listNext.length );

			insertNextDrawingObjectListToHistory.apply( this, [ listNext ] );
			notifyObjectChange.apply( this, [] );

			if( redraw ){
				this.updateDrawing();
			}
		},
		modifyDrawingObjectInList : function( drawingObject, execModify, redraw ){

			var listNext = nextDrawingObjectList.apply( this, [] );

			for( var i = 0, ii = listNext.length; i < ii; i++ ){
				if( listNext[ i ] === drawingObject ){

					var isSelected = listNext[ i ] === this.getSelected();
					var isWorkingCurrent = listNext[ i ] === this.workingCurrent;
					listNext[ i ] = newDrawingObject( JSON.parse( JSON.stringify( listNext[ i ] ) ) );
					if( isSelected ){
						this.select( listNext[ i ] );
					}
					if( isWorkingCurrent ){
						this.workingCurrent = listNext[ i ];
					}

					if( execModify ){
						execModify( listNext[ i ] );
					}
					break;
				}
			}

			insertNextDrawingObjectListToHistory.apply( this, [ listNext ] );
			notifyObjectChange.apply( this, [] );
			if( redraw ){
				this.updateDrawing();
			}

		},
		toPagePt : function( pt ){
			return new _obj.Point(
				( pt.x - this.pageRect.left ) / this.pageScale,
				( pt.y - this.pageRect.top ) / this.pageScale
			)
		},
		fromPagePt : function( pt ){
			return new _obj.Point(
				pt.x * this.pageScale + this.pageRect.left,
				pt.y * this.pageScale + this.pageRect.top
			)
		},
	}
	return DrawingObjectLayer;
} )();

pageMarkupLayer = null;

window.addEventListener( 'load', function(){

	var drawingCanvas = document.getElementById( 'canvasLayer' );
	pageMarkupLayer = new DrawingObjectLayer(
		drawingCanvas,
		document.getElementById( 'drawLayer' ),
		new DrawingObjectLayer.PaintOption( {
			rgb : '#000000',
			fill : false
		} ),
		null,
		null
	);
	pageMarkupLayer.updateViewport( new _obj.Rect( 0, 0, 10, 10 ), 1 );
	pageMarkupLayer.activate();
	pageMarkupLayer.setModeFreeLine();
	
	updatePopModalSetMode( 'FreeLine' );
	updatePaintOptionColor( pageMarkupLayer.paintOption.rgb );

} );

window.addEventListener('pageshow', function(event) {
	$( '#btnFreeLine' ).click( function(){
		pageMarkupLayer.setModeFreeLine();
		updateSliderLineWidth( 3 );
		updateSliderAlpha( 100 );
	} );
	$( '#btnTransparentFreeLine' ).click( function(){
		pageMarkupLayer.setModeTransparentFreeLine();
		updateSliderLineWidth( 10 );
		updateSliderAlpha( 50 );
	} );
	$( '#btnEraser' ).click( function(){
		pageMarkupLayer.setModeEraser();
	} );
	$( '#btnEraserAll' ).click( function(){
		pageMarkupLayer.removeAllDrawingObjectFromList( true );
	} );

	$( 'div.set-color button' ).click( function(){
		var colSet = new Object();
		colSet[ 'green' ] = '#00a651';
		colSet[ 'red' ] = '#ff0000';
		colSet[ 'blue' ] = '#254ee9';
		colSet[ 'white' ] = '#ffffff';
		colSet[ 'yellow' ] = '#ffff00';
		colSet[ 'black' ] = '#000000';

		var cls = $( this ).attr( 'class' );

		updatePaintOptionColor( colSet[ cls ] );
	} );

	//기능버튼 펜 클릭 이벤트 
	$( '#btnPopPen' ).click( function(){
		updateDrawWriteTool( this );
	} );

	//기능버튼 지우개 클릭 이벤트
	$( '#btnPopEraser' ).click( function(){
		updateDrawWriteTool( this );
	} );

	//기능 모달 - 닫기버튼 이벤트
	$( document ).on( 'click', '.pop-close', function(){
		var modalId = $( this ).closest( '.pop-window' ).get( 0 ).id;
		$( '#' + modalId ).modal( 'hide' );
	} );

	//개체선택
	$( '#btnSelector' ).click( function(){
		pageMarkupLayer.setModeSelect();
		popModalCloseAll();
	} );
} );

//기능버튼 클릭했을때 실행
function updateDrawWriteTool( obj ) {
	var cls = obj.className.replace( 'active', '' ).trim();

	if( _obj.util.isEmpty( cls ) ){
		return;
	}

	var selected = $( obj ).hasClass( 'active' );

	if( selected ){
		$( '#pop-' + cls ).modal();
	} else {

		if( cls == 'pen'){
			pageMarkupLayer.setModeFreeLine();
			updatePopModalSetMode();
			updatePaintOptionColor( pageMarkupLayer.paintOption.rgb );
			updateSliderLineWidth( 3 );
			updateSliderAlpha( 100 );

		}else if( cls == 'eraser' ){
			pageMarkupLayer.setModeEraser();
			updatePopModalSetMode();
		}

		updateSelectedMenu( $( obj ).children( 'a' ) );
		popModalCloseAll();
	}
}

function updatePaintOptionLineWidth( value ){
	var selected = pageMarkupLayer.getSelected();
	if( selected ){

		pageMarkupLayer.modifyDrawingObjectInList(
			selected,
			function( tgt ){
				tgt.paintOption.lineWidth = value;
			},
			true
		);

	}else{
		pageMarkupLayer.paintOption.lineWidth = value;
	}
}

function updatePaintOptionAlpha( value ){
	value = Number( value / 100 );

	var selected = pageMarkupLayer.getSelected();
	if( selected ){

		pageMarkupLayer.modifyDrawingObjectInList(
			selected,
			function( tgt ){
				tgt.paintOption.alpha = value;
			},
			true
		);

	}else{
		pageMarkupLayer.paintOption.alpha = value;
	}
}

function updatePaintOptionColor( value ){
	var selected = pageMarkupLayer.getSelected();
	if( selected ){

		pageMarkupLayer.modifyDrawingObjectInList(
			selected,
			function( tgt ){
				tgt.paintOption.rgb = value;
			},
			true
		);

	}else{
		pageMarkupLayer.paintOption.rgb = value;
	}
	$( '.selected-color' ).css( 'background', value );
}

function updatePaintOptionFontSize( value ){
	var selected = pageMarkupLayer.getSelected();
	if( selected ){

		pageMarkupLayer.modifyDrawingObjectInList(
			selected,
			function( tgt ){
				tgt.paintOption.fontSize = value;
			},
			true
		);

	}else{
		pageMarkupLayer.paintOption.fontSize = value;
	}
	$( '#btnFontSize' + value ).parent().addClass( 'active' );
}

function updateSliderLineWidth( value ){
	$("#pen-bar").css("width", (value * 5) + "%");
	$("#pen-bar-txt").text(value + "px");
	$('#pen-stroke').bootstrapSlider('setValue', value, true);
	$('#figure-stroke').bootstrapSlider('setValue', value, true);
}

function updateSliderAlpha( value ) {
	$("#transparent-bar").css("width", (value)+"%");
	$("#transparent-bar-txt").text(value+"%");
	$( '#pen-transparent' ).bootstrapSlider( 'setValue', value, true );
	$( '#figure-transparent' ).bootstrapSlider( 'setValue', value, true );
}

function updateSlider( id, value ){
	$( '#' + id ).bootstrapSlider( 'setValue', value, true );
}

//기능버튼 활성화 표시
function updateSelectedMenu( sel ) {
	$( '#draw-write-tool li > a' ).not( '#btnShowHide' ).parent( 'li' ).removeClass( 'active' );
	$( sel ).parent( 'li' ).addClass( 'active' );
}

//기능 모달 전체 닫기
function popModalCloseAll(){
	$( '#pop-pen, #pop-eraser' ).modal( 'hide' );
}

//기능 모달 - 버튼 활성화 표시
function updatePopModalSetMode( type ){

	if( _obj.util.isEmpty( type ) ){
		type = pageMarkupLayer.workingCurrentType.TYPE;
		type = _obj.util.isAssigned( type ) ? type : pageMarkupLayer.workingCurrentType.name;
		if( _obj.util.isAssigned( type ) ){
			type = type.replace( 'ControlObject', '' );
		}
	}

	if( _obj.util.isEmpty( type ) ) return;

	$( '.tool-select-wrap li' ).removeClass( 'active' );

	var btn = '';

	if ( 'FreeLine' == type ){
		btn = '#btnFreeLine';
	} else if ( 'TransparentFreeLine' == type ){
		btn = '#btnTransparentFreeLine';
	} else if ( 'Eraser' == type ){
		btn = '#btnEraser';
	}

	$( btn ).parent().addClass( 'active' );
}

$(function () {
	$(document).ready(function () {
		$('.tool-select-wrap li').click(function () {
			$('li').removeClass("active");
			$(this).addClass("active");
		});
	});
});

window.addEventListener( 'load', function(){
	$('#pop-pen').draggable({
	    handle: ".title",
	    cursor: "move"
	});
	
	$('#pop-eraser').draggable({
	    handle: ".title",
	    cursor: "move"
	});

	//펜 선굵기 슬라이드
    $('#pen-stroke').bootstrapSlider({
        min: 1,
        max: 20,
        value: pageMarkupLayer.paintOption.lineWidth,
        formatter: function (value) {
            $('#pen-stroke').next().text(value + 'px');
            return ' ' + value;
        }
    }).on('slide', function (data) {
	    	$("#pen-bar").css("width", (data.value*5)+"%");
	    	$("#pen-bar-txt").text(data.value+"px");
        updatePaintOptionLineWidth(data.value);
    }).on('slideStop', function (data) {
	    	$("#pen-bar").css("width", (data.value*5)+"%");
	    	$("#pen-bar-txt").text(data.value+"px");
        updatePaintOptionLineWidth(data.value);
    });
	
  	//펜 투명도 슬라이드
    $('#pen-transparent').bootstrapSlider({
        min: 1,
        max: 100,
        value: Number(pageMarkupLayer.paintOption.alpha * 100),
        formatter: function (value) {
            $('#pen-transparent').next().text(value + '%');
            return ' ' + value;
        }
    }).on('slide', function (data) {
	    	$("#transparent-bar").css("width", (data.value)+"%");
	    	$("#transparent-bar-txt").text(data.value+"%");
        updatePaintOptionAlpha(data.value);
    }).on('slideStop', function (data) {
	    	$("#transparent-bar").css("width", (data.value)+"%");
	    	$("#transparent-bar-txt").text(data.value+"%");
        updatePaintOptionAlpha(data.value);
    });

  	//파레트 버튼
    $('.btn_colorpick_select').colpick({
        color: pageMarkupLayer.paintOption.rgb,
        submit: 1,
        onChange: function (hsb, hex, rgb, el, bySetColor) {
            updatePaintOptionColor( '#' + hex );
        }.bind(this),
        onSubmit: function (e) {
            $('.btn_colorpick_select').colpickHide();
        }
    });
});