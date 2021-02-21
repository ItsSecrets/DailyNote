
### 基本流程
1. cc.Director的`mainLoop`里面会调用`renderer.render`方法：
```

	/*
     * Run main loop of director
     */
    mainLoop:function (now) {
        if (this._purgeDirectorInNextLoop) {
            this._purgeDirectorInNextLoop = false;
            this.purgeDirector();
        }
        else {
            // calculate "global" dt
            this.calculateDeltaTime(now);

            // Update
            if (!this._paused) {
                // before update
                this.emit(cc.Director.EVENT_BEFORE_UPDATE);

                // Call start for new added components
                this._compScheduler.startPhase();

                // Update for components
                this._compScheduler.updatePhase(this._deltaTime);
                // Engine update with scheduler
                this._scheduler.update(this._deltaTime);

                // Late update for components
                this._compScheduler.lateUpdatePhase(this._deltaTime);

                // After life-cycle executed
                this._compScheduler.clearup();

                // User can use this event to do things after update
                this.emit(cc.Director.EVENT_AFTER_UPDATE);
                
                // Destroy entities that have been removed recently
                Obj._deferredDestroy();
            }

            // Render
            this.emit(cc.Director.EVENT_BEFORE_DRAW);
            renderer.render(this._scene, this._deltaTime);

            // After draw
            this.emit(cc.Director.EVENT_AFTER_DRAW);

            eventManager.frameUpdateListeners();
            this._totalFrames++;
        }
    }

```