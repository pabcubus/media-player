import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Video } from '../../interfaces/video';
import * as moment from 'moment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	@ViewChild('url') url: ElementRef;

	currentVideo: Video;
	currentVideoEditing: Video;
	videoEditing: boolean = false;
	videoPlaying: boolean = false;
	videoDuration: string = '0';
	videoLoaded: boolean = false;
	videos: Array<Video> = [];
	videoSearchTerm: string = '';
	videoForm = this.fb.group({
		tags: ['', Validators.pattern('^((\\w+),?)+$')],
		name: ['', Validators.required],
		url: ['', Validators.required],
		startMin: 0,
		startMax: 0
	});

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		let vid = document.getElementById('video-player');
		vid.onplaying = () => {
			this.videoPlaying = true;
		};
		vid.onpause = () => {
			this.videoPlaying = false;
		};
		vid.onended = () => {
			let index = this.videos.findIndex(item => item.id === this.currentVideo.id);
			if (index < (this.videos.length - 1)) {
				this.selectVideo(this.videos[index + 1].id);
			}
		};
	}

	onSubmit() {
		if (this.videoEditing) {
			let index = this.videos.findIndex(item => item.id === this.currentVideoEditing.id);
			let video:Video = {
				id: this.currentVideoEditing.id,
				tags: this.videoForm.get('tags').value,
				name: this.videoForm.get('name').value,
				url: this.videoForm.get('url').value,
				startMin: this.videoForm.get('startMin').value,
				startMax: this.videoForm.get('startMax').value
			};

			this.videos.splice(index, 1, video);
			this.videoEditing = false;

			this.videoForm.reset();
			this.videoForm.get('tags').reset();
			this.videoForm.get('name').reset();
			this.videoForm.get('url').reset();
			this.videoForm.get('startMin').setValue(0);
			this.videoForm.get('startMax').setValue(0);
		} else if (this.videoForm.get('startMin').value < this.videoForm.get('startMax').value){
			this.currentVideo = {
				id: Date.now(),
				tags: this.videoForm.get('tags').value,
				name: this.videoForm.get('name').value,
				url: this.videoForm.get('url').value,
				startMin: this.videoForm.get('startMin').value,
				startMax: this.videoForm.get('startMax').value
			};

			this.videos.unshift(this.currentVideo);

			this.videoLoaded = false;

			this.playVideo(this.currentVideo.id);

			this.videoForm.reset();
			this.videoForm.get('tags').reset();
			this.videoForm.get('name').reset();
			this.videoForm.get('url').reset();
			this.videoForm.get('startMin').setValue(0);
			this.videoForm.get('startMax').setValue(0);
		} else {
			alert('Time limits are invalid');
		}
	}

	checkVideoDuration(videoURL?: string) {
		var url = videoURL ? videoURL : this.videoForm.get('url').value;

		if (url.length < 7) {
			return;
		}

		var video = document.createElement('video');
		var source = document.createElement('source');

		source.setAttribute('src', url);

		video.appendChild(source);
		video.onloadeddata = () => {
			this.videoDuration = '' + Math.floor(video.duration);
			this.videoForm.get('startMin').setValue(0);
			this.videoForm.get('startMax').setValue(Math.floor(video.duration));
			this.videoLoaded = true;
		};

		video.load();
	}

	getStartTime(startMin?: number): string {
		let seconds = startMin ? startMin : this.videoForm.get('startMin').value;
		let result = seconds + ' segs';

		let mins = seconds/60;
		if (Math.floor(mins) > 0) {
			result = moment().minutes(Math.floor(mins) - 1).seconds(Math.floor(seconds)).format('mm:ss');
		}

		let hours = mins/60;
		if (Math.floor(hours) > 0) {
			result = moment().hours(Math.floor(hours) - 1).minutes(Math.floor(mins) - 1).seconds(Math.floor(seconds)).format('h:mm:ss');
		}

		return result;
	}

	selectVideo(videoId?: number): void {
		if (this.currentVideo.id === videoId) {
			let video:any = document.getElementById('video-player');
			video.play();
		} else {
			this.playVideo(videoId);
		}
	}

	editVideo(videoId?: number) {
		this.videoEditing = true;
		this.currentVideoEditing = this.videos.find((item) => item.id === videoId);

		this.videoForm.get('tags').setValue(this.currentVideoEditing.tags);
		this.videoForm.get('name').setValue(this.currentVideoEditing.name);
		this.videoForm.get('url').setValue(this.currentVideoEditing.url);
		this.videoForm.get('startMin').setValue(this.currentVideoEditing.startMin);
		this.videoForm.get('startMax').setValue(this.currentVideoEditing.startMax);

		this.checkVideoDuration(this.currentVideoEditing.url);
	}

	pauseVideo() {
		let video:any = document.getElementById('video-player');
		video.pause();
	}

	removeVideo(videoId?: number): void {
		this.videos = this.videos.filter(item => item.id != videoId);

		if (this.videos.length > 0) {
			this.currentVideo = this.currentVideo.id === videoId ? this.videos[0] : this.currentVideo;
			this.playVideo(this.videos[0].id);
		} else {
			this.currentVideo = null;
			let video:any = document.getElementById('video-player');
			video.src = null;
		}
	}

	playVideo(videoId?: number): void {
		let video:any = document.getElementById('video-player');

		video.pause();
		this.currentVideo = this.videos.find((item) => item.id === videoId);
		setTimeout(() => {
			video.load();
			video.play();
		}, 500);
	}

	get getFilteredVideos(): Array<Video>{
		return this.videoSearchTerm.length <= 0 ? this.videos : this.videos.filter(
			item => item.name.indexOf(this.videoSearchTerm) != -1 || item.url.indexOf(this.videoSearchTerm) != -1 || item.url.indexOf(this.videoSearchTerm) != -1
		);
	}
}
