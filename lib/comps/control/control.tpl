<div class="tvp_controls">
	<div class="tvp_button tvp_playpause_button tvp_play" 
		r-on="{click: _onPlay}"
		r-class="{
			tvp_play: !play;
			tvp_pause: play;
		}"
	>
		<button type="button" title="播放/暂停"><span class="tvp_btn_value">播放</span></button>
	</div>
	<div class="tvp_time_rail">
		<span class="tvp_time_total">
			<span class="tvp_time_loaded" style="width: 100%;"></span>
			<span class="tvp_time_current" style="width: 0px;"><span class="tvp_time_handle"></span></span>
		</span>
		<span class="tvp_time_panel">
			<span class="tvp_time_panel_current">00:00</span>
			<span class="tvp_time_panel_split">/</span>
			<span class="tvp_time_panel_total">00:15</span>           
		</span>  
	</div>
	<div class="tvp_barrage_switch tvp_none">
		<div class="tvp_btn_barrage" data-role="tvp-bullet-switch">
			<div class="tvp_btn_value">弹</div>
		</div>
	</div>
	<div class="tvp_button tvp_volume tvp_none">
		<div class="tvp_btn_volume"><div class="tvp_icon_volume"></div></div>
		<div class="tvp_volume_slider">
			<div class="tvp_volume_range">
				<div class="tvp_volume_range_current" style="height:50%"><div class="tvp_volume_handle"></div></div>
			</div>
		</div>
	</div>
	<div class="tvp_button tvp_definition _tvp_definition_ tvp_none">
		<div class="tvp_definition_button"><span>清晰度</span></div>
	<div class="tvp_definition_list"></div>  
	</div>
	<div class="tvp_button tvp_fullscreen_button tvp_fullscreen">
		<button type="button" title="切换全屏"><span class="tvp_btn_value">全屏</span></button>  
	</div>
	<span class="tvp_time_handel_hint" style="display:none"></span>
</div>