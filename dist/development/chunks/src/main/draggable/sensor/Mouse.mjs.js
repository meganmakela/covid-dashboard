(self["webpackChunkcovid19_dashboard"] = self["webpackChunkcovid19_dashboard"] || []).push([["src/main/draggable/sensor/Mouse.mjs"],{

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Base
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Abstract base class for other sensors
 * @class Neo.main.draggable.sensor.Base
 * @extends Neo.core.Base
 */
class Base extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Base'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Base',
        /**
         * @member {HTMLElement|null} currentElement=null
         * @protected
         */
        currentElement: null,
        /**
         * @member {String[]} dragTargetClasses=['neo-draggable','neo-resizable']
         */
        dragTargetClasses: ['neo-draggable', 'neo-resizable'],
        /**
         * @member {Boolean} isDragging=false
         * @protected
         */
        isDragging: false,
        /**
         * @member {Event|null} lastEvent=null
         * @protected
         */
        lastEvent: null,
        /**
         * @member {Event|null} startEvent=null
         * @protected
         */
        startEvent: null
    }}

    /**
     *
     */
    onConstructed() {
        this.attach();
        super.onConstructed();
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {}

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {}

    /**
     * Triggers a custom event on the target element
     * @param {HTMLElement} element - Element to trigger event on
     * @param {Object} sensorEvent - Sensor event to trigger
     * @returns {Event}
     */
    trigger(element, sensorEvent) {
        const event = document.createEvent('Event');
        event.detail = sensorEvent;
        event.initEvent(sensorEvent.type, true, true);
        element.dispatchEvent(event);
        this.lastEvent = sensorEvent;

        return sensorEvent;
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs ***!
  \******************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Mouse
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");



/**
 * @class Neo.main.draggable.sensor.Mouse
 * @extends Neo.main.draggable.sensor.Base
 */
class Mouse extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Mouse'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Mouse',
        /**
         * @member {Number} delay=0
         */
        delay: 0,
        /**
         * @member {Number} minDistance=1
         */
        minDistance: 1,
        /**
         * @member {Number} mouseDownTime=0
         */
        mouseDownTime: 0,
        /**
         * @member {Number|null} mouseDownTimeout=null
         */
        mouseDownTimeout: null,
        /**
         * @member {Number|null} pageX=null
         * @protected
         */
        pageX: null,
        /**
         * @member {Number|null} pageY=null
         * @protected
         */
        pageY: null
    }}

    /**
     *
     * @param config
     */
    constructor(config) {
        super(config);
        Neo.bindMethods(this, ['onDistanceChange', 'onMouseDown', 'onMouseMove', 'onMouseUp']);
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {
        document.addEventListener('mousedown', this.onMouseDown, true);
    }

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {
        document.removeEventListener('mousedown', this.onMouseDown, true);
    }

    /**
     * Detect change in distance, starting drag when both delay and distance requirements are met
     * @param {MouseEvent|Object} event - Object in case it does get trigger via the mouseDownTimeout
     */
    onDistanceChange(event) {
        let me = this;

        if (me.currentElement) {
            const {pageX, pageY}    = event,
                  timeElapsed       = Date.now() - me.mouseDownTime,
                  distanceTravelled = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getDistance(me.startEvent.pageX, me.startEvent.pageY, pageX, pageY) || 0;

            Object.assign(me, {pageX, pageY});

            if (timeElapsed >= me.delay && distanceTravelled >= me.minDistance) {
                clearTimeout(me.mouseDownTimeout);
                document.removeEventListener('mousemove', me.onDistanceChange);
                me.startDrag();
            }
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        if (event.button === 0 && !event.ctrlKey && !event.metaKey) {
            let me     = this,
                target = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.testPathInclusion(event, me.dragTargetClasses);

            if (target) {
                Object.assign(me, {
                    currentElement: target.node,
                    mouseDownTime : Date.now(),
                    pageX         : event.pageX,
                    pageY         : event.pageY,
                    startEvent    : event
                });

                document.addEventListener('dragstart', preventDefault);
                document.addEventListener('mousemove', me.onDistanceChange);
                document.addEventListener('mouseup',   me.onMouseUp);

                me.mouseDownTimeout = setTimeout(() => {
                    me.onDistanceChange({pageX: me.pageX, pageY: me.pageY});
                }, me.delay);
            }
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseMove(event) {
        let me = this;

        if (me.dragging) {
            let element = me.currentElement,
                target  = document.elementFromPoint(event.clientX, event.clientY);

            me.trigger(element, {
                clientX      : event.clientX,
                clientY      : event.clientY,
                element,
                originalEvent: event,
                path         : me.startEvent.path || me.startEvent.composedPath(),
                target,
                type         : 'drag:move'
            });
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        if (event.button === 0) {
            let me = this;

            clearTimeout(me.mouseDownTimeout);

            document.removeEventListener('dragstart', preventDefault);
            document.removeEventListener('mousemove', me.onDistanceChange);
            document.removeEventListener('mouseup',   me.onMouseUp);

            if (me.dragging) {
                let element = me.currentElement,
                    target  = document.elementFromPoint(event.clientX, event.clientY);

                me.trigger(element, {
                    clientX      : event.clientX,
                    clientY      : event.clientY,
                    element,
                    originalEvent: event,
                    path         : me.startEvent.path || me.startEvent.composedPath(),
                    target,
                    type         : 'drag:end'
                });

                document.removeEventListener('contextmenu', preventDefault, true);
                document.removeEventListener('mousemove',   me.onMouseMove);

                Object.assign(me, {
                    currentElement: null,
                    dragging      : false,
                    startEvent    : null
                });
            }

            me.dragging = false;
        }
    }

    /**
     *
     */
    startDrag() {
        let me         = this,
            element    = me.currentElement,
            startEvent = me.startEvent;

        me.trigger(element, {
            clientX      : startEvent.clientX,
            clientY      : startEvent.clientY,
            element,
            originalEvent: startEvent,
            path         : startEvent.path || startEvent.composedPath(),
            target       : startEvent.target,
            type         : 'drag:start'
        });

        me.dragging = true;

        if (me.dragging) {
            document.addEventListener('contextmenu', preventDefault, true);
            document.addEventListener('mousemove',   me.onMouseMove);
        }
    }
}

function preventDefault(event) {
    event.preventDefault();
}

Neo.applyClassConfig(Mouse);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWRhc2hib2FyZC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvQmFzZS5tanMiLCJ3ZWJwYWNrOi8vY292aWQxOS1kYXNoYm9hcmQvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL01vdXNlLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVE7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0IsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VtQztBQUNTOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4Q0FBSTtBQUN4Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQztBQUNBLHNDQUFzQywrREFBcUI7O0FBRTNELCtCQUErQixhQUFhOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHFFQUEyQjs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QyxpQ0FBaUM7QUFDMUUsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9zcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL01vdXNlLm1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3JlQmFzZSBmcm9tICcuLi8uLi8uLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBvdGhlciBzZW5zb3JzXG4gKiBAY2xhc3MgTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb3JlQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuQmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0hUTUxFbGVtZW50fG51bGx9IGN1cnJlbnRFbGVtZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY3VycmVudEVsZW1lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gZHJhZ1RhcmdldENsYXNzZXM9WyduZW8tZHJhZ2dhYmxlJywnbmVvLXJlc2l6YWJsZSddXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnVGFyZ2V0Q2xhc3NlczogWyduZW8tZHJhZ2dhYmxlJywgJ25lby1yZXNpemFibGUnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzRHJhZ2dpbmc9ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtFdmVudHxudWxsfSBsYXN0RXZlbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBsYXN0RXZlbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtFdmVudHxudWxsfSBzdGFydEV2ZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhcnRFdmVudDogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoKCk7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG4gICAgYXR0YWNoKCkge31cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIERPTVxuICAgICAqL1xuICAgIGRldGFjaCgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIGN1c3RvbSBldmVudCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byB0cmlnZ2VyIGV2ZW50IG9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNlbnNvckV2ZW50IC0gU2Vuc29yIGV2ZW50IHRvIHRyaWdnZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnR9XG4gICAgICovXG4gICAgdHJpZ2dlcihlbGVtZW50LCBzZW5zb3JFdmVudCkge1xuICAgICAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICBldmVudC5kZXRhaWwgPSBzZW5zb3JFdmVudDtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KHNlbnNvckV2ZW50LnR5cGUsIHRydWUsIHRydWUpO1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmxhc3RFdmVudCA9IHNlbnNvckV2ZW50O1xuXG4gICAgICAgIHJldHVybiBzZW5zb3JFdmVudDtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJhc2UpO1xuXG5leHBvcnQge0Jhc2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgICBmcm9tICcuL0Jhc2UubWpzJztcbmltcG9ydCBEb21FdmVudHMgZnJvbSAnLi4vLi4vRG9tRXZlbnRzLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuTW91c2VcbiAqIEBleHRlbmRzIE5lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuQmFzZVxuICovXG5jbGFzcyBNb3VzZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLk1vdXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLk1vdXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gZGVsYXk9MFxuICAgICAgICAgKi9cbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG1pbkRpc3RhbmNlPTFcbiAgICAgICAgICovXG4gICAgICAgIG1pbkRpc3RhbmNlOiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBtb3VzZURvd25UaW1lPTBcbiAgICAgICAgICovXG4gICAgICAgIG1vdXNlRG93blRpbWU6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gbW91c2VEb3duVGltZW91dD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBtb3VzZURvd25UaW1lb3V0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHBhZ2VYPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcGFnZVg6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gcGFnZVk9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBwYWdlWTogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgTmVvLmJpbmRNZXRob2RzKHRoaXMsIFsnb25EaXN0YW5jZUNoYW5nZScsICdvbk1vdXNlRG93bicsICdvbk1vdXNlTW92ZScsICdvbk1vdXNlVXAnXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuICAgIGF0dGFjaCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgRE9NXG4gICAgICovXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlY3QgY2hhbmdlIGluIGRpc3RhbmNlLCBzdGFydGluZyBkcmFnIHdoZW4gYm90aCBkZWxheSBhbmQgZGlzdGFuY2UgcmVxdWlyZW1lbnRzIGFyZSBtZXRcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR8T2JqZWN0fSBldmVudCAtIE9iamVjdCBpbiBjYXNlIGl0IGRvZXMgZ2V0IHRyaWdnZXIgdmlhIHRoZSBtb3VzZURvd25UaW1lb3V0XG4gICAgICovXG4gICAgb25EaXN0YW5jZUNoYW5nZShldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3Qge3BhZ2VYLCBwYWdlWX0gICAgPSBldmVudCxcbiAgICAgICAgICAgICAgICAgIHRpbWVFbGFwc2VkICAgICAgID0gRGF0ZS5ub3coKSAtIG1lLm1vdXNlRG93blRpbWUsXG4gICAgICAgICAgICAgICAgICBkaXN0YW5jZVRyYXZlbGxlZCA9IERvbUV2ZW50cy5nZXREaXN0YW5jZShtZS5zdGFydEV2ZW50LnBhZ2VYLCBtZS5zdGFydEV2ZW50LnBhZ2VZLCBwYWdlWCwgcGFnZVkpIHx8IDA7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtwYWdlWCwgcGFnZVl9KTtcblxuICAgICAgICAgICAgaWYgKHRpbWVFbGFwc2VkID49IG1lLmRlbGF5ICYmIGRpc3RhbmNlVHJhdmVsbGVkID49IG1lLm1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1lLm1vdXNlRG93blRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1lLm9uRGlzdGFuY2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIG1lLnN0YXJ0RHJhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gRG9tRXZlbnRzLnRlc3RQYXRoSW5jbHVzaW9uKGV2ZW50LCBtZS5kcmFnVGFyZ2V0Q2xhc3Nlcyk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50OiB0YXJnZXQubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgbW91c2VEb3duVGltZSA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VYICAgICAgICAgOiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVkgICAgICAgICA6IGV2ZW50LnBhZ2VZLFxuICAgICAgICAgICAgICAgICAgICBzdGFydEV2ZW50ICAgIDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHByZXZlbnREZWZhdWx0KTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtZS5vbkRpc3RhbmNlQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgICBtZS5vbk1vdXNlVXApO1xuXG4gICAgICAgICAgICAgICAgbWUubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS5vbkRpc3RhbmNlQ2hhbmdlKHtwYWdlWDogbWUucGFnZVgsIHBhZ2VZOiBtZS5wYWdlWX0pO1xuICAgICAgICAgICAgICAgIH0sIG1lLmRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IG1lLmN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldCAgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICAgICAgICBtZS50cmlnZ2VyKGVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGllbnRYICAgICAgOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGNsaWVudFkgICAgICA6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBwYXRoICAgICAgICAgOiBtZS5zdGFydEV2ZW50LnBhdGggfHwgbWUuc3RhcnRFdmVudC5jb21wb3NlZFBhdGgoKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2RyYWc6bW92ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dChtZS5tb3VzZURvd25UaW1lb3V0KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudERlZmF1bHQpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbWUub25EaXN0YW5jZUNoYW5nZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgICBtZS5vbk1vdXNlVXApO1xuXG4gICAgICAgICAgICBpZiAobWUuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IG1lLmN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgICAgICAgICAgIG1lLnRyaWdnZXIoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgICAgICBjbGllbnRYICAgICAgOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZICAgICAgOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcGF0aCAgICAgICAgIDogbWUuc3RhcnRFdmVudC5wYXRoIHx8IG1lLnN0YXJ0RXZlbnQuY29tcG9zZWRQYXRoKCksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2RyYWc6ZW5kJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBwcmV2ZW50RGVmYXVsdCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgICBtZS5vbk1vdXNlTW92ZSk7XG5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2luZyAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RXZlbnQgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXJ0RHJhZygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZWxlbWVudCAgICA9IG1lLmN1cnJlbnRFbGVtZW50LFxuICAgICAgICAgICAgc3RhcnRFdmVudCA9IG1lLnN0YXJ0RXZlbnQ7XG5cbiAgICAgICAgbWUudHJpZ2dlcihlbGVtZW50LCB7XG4gICAgICAgICAgICBjbGllbnRYICAgICAgOiBzdGFydEV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZICAgICAgOiBzdGFydEV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogc3RhcnRFdmVudCxcbiAgICAgICAgICAgIHBhdGggICAgICAgICA6IHN0YXJ0RXZlbnQucGF0aCB8fCBzdGFydEV2ZW50LmNvbXBvc2VkUGF0aCgpLFxuICAgICAgICAgICAgdGFyZ2V0ICAgICAgIDogc3RhcnRFdmVudC50YXJnZXQsXG4gICAgICAgICAgICB0eXBlICAgICAgICAgOiAnZHJhZzpzdGFydCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmIChtZS5kcmFnZ2luZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBwcmV2ZW50RGVmYXVsdCwgdHJ1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAgIG1lLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNb3VzZSk7XG5cbmV4cG9ydCB7TW91c2UgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==