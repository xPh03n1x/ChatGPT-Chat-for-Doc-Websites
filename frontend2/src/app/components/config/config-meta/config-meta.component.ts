
/*
 * Copyright(c) Thomas Hansen thomas@servergardens.com, all right reserved
 */

// Angular and system imports.
import { Component, OnInit } from '@angular/core';

// Utility imports.
import moment from 'moment';
import { ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

// Application specific imports.
import { Count } from 'src/app/models/count.model';
import { LogItem } from 'src/app/models/log-item.model';
import { Endpoint } from 'src/app/models/endpoint.model';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

/**
 * Component that allows user to view meta information about his installation.
 */
@Component({
  selector: 'app-config-meta',
  templateUrl: './config-meta.component.html',
  styleUrls: ['./config-meta.component.scss']
})
export class ConfigMetaComponent implements OnInit {

  /**
   * Number of users in installation.
   */
  public userCount: number = null;

  /**
   * Number of roles in installation.
   */
  public roleCount: number = null;

  /**
   * Number of log items in installation.
   */
  public logCount: number = null;

  /**
   * Oldest log item in installation.
   */
  public age: Date = null;

  /**
   * Total LOC count Magic has generated.
   */
  public loc: number = -1;

  /**
   * Total number of errors the system has logged since it was installed.
   */
  public errors: number = -1;

  /**
   * Total count of tasks in system
   */
  public taskCount: number = -1;

  /**
   * Total number of endpoints in the system.
   */
  public endpoints: number = -1;

  /**
   * Options for LOC pie chart.
   */
  public locOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  /**
   * Labels for LOC pie chart.
   */
  public locLabels: Label[] = [['Backend'], ['Frontend']];

  /**
   * Data set for LOC pie chart.
   */
  public locData: SingleDataSet = null;

  /**
   * Colors for LOC pie chart.
   */
  public locColors = [{
    backgroundColor: [
      'rgba(180,180,180,0.8)',
      'rgba(120,120,120,0.8)',
    ]}];

  /**
   * Options for log type pie chart.
   */
  public logTypeOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  /**
   * Labels for log type pie chart.
   */
  public logTypeLabels: Label[] = null;

  /**
   * Data set for log type pie chart.
   */
  public logTypeData: SingleDataSet = null;

  /**
   * Colors for log type pie chart.
   */
  public logTypeColors = [{
    backgroundColor: [
      'rgba(220,220,220,0.8)',
      'rgba(180,180,180,0.8)',
      'rgba(120,120,120,0.8)',
      'rgba(80,80,80,0.8)',
    ]}];

  /**
   * Options for log items per day bar chart.
   */
  public daysOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  /**
   * Labels for log items per day bar chart.
   */
  public daysLabels: Label[] = [];

  /**
   * Dataset for log items per day bar chart.
   */
  public daysData: SingleDataSet = null;

  /**
   * Colors for log items per day bar chart.
   */
  public daysColors = [{
    backgroundColor: [
      'rgba(200,200,200,0.6)',
      'rgba(190,190,190,0.6)',
      'rgba(180,180,180,0.6)',
      'rgba(170,170,170,0.6)',
      'rgba(160,160,160,0.6)',
      'rgba(150,150,150,0.6)',
      'rgba(140,140,140,0.6)',
      'rgba(130,130,130,0.6)',
      'rgba(120,120,120,0.6)',
      'rgba(110,110,110,0.6)',
      'rgba(100,100,100,0.6)',
      'rgba(90,90,90,0.6)',
      'rgba(80,80,80,0.6)',
      'rgba(70,70,70,0.6)',
    ]}];

  /**
   * Options for log items per day bar chart.
   */
  public loginOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  /**
   * Labels for log items per day bar chart.
   */
  public loginLabels: Label[] = [];

  /**
   * Dataset for log items per day bar chart.
   */
  public loginData: SingleDataSet = null;

  /**
   * Colors for log items per day bar chart.
   */
  public loginColors = [{
    backgroundColor: [
      'rgba(200,200,200,0.6)',
      'rgba(190,190,190,0.6)',
      'rgba(180,180,180,0.6)',
      'rgba(170,170,170,0.6)',
      'rgba(160,160,160,0.6)',
      'rgba(150,150,150,0.6)',
      'rgba(140,140,140,0.6)',
      'rgba(130,130,130,0.6)',
      'rgba(120,120,120,0.6)',
      'rgba(110,110,110,0.6)',
      'rgba(100,100,100,0.6)',
      'rgba(90,90,90,0.6)',
      'rgba(80,80,80,0.6)',
      'rgba(70,70,70,0.6)',
    ]}];

  /**
   * Options for log items per day bar chart.
   */
  public failedLoginOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  /**
   * Labels for log items per day bar chart.
   */
  public failedLoginLabels: Label[] = [];

  /**
   * Dataset for log items per day bar chart.
   */
  public failedLoginData: SingleDataSet = null;

  /**
   * Colors for log items per day bar chart.
   */
  public failedLoginColors = [{
    backgroundColor: [
      'rgba(200,200,200,0.6)',
      'rgba(190,190,190,0.6)',
      'rgba(180,180,180,0.6)',
      'rgba(170,170,170,0.6)',
      'rgba(160,160,160,0.6)',
      'rgba(150,150,150,0.6)',
      'rgba(140,140,140,0.6)',
      'rgba(130,130,130,0.6)',
      'rgba(120,120,120,0.6)',
      'rgba(110,110,110,0.6)',
      'rgba(100,100,100,0.6)',
      'rgba(90,90,90,0.6)',
      'rgba(80,80,80,0.6)',
      'rgba(70,70,70,0.6)',
    ]}];

  /**
   * Options for log items per day bar chart.
   */
  public accessDeniedOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };

  /**
   * Labels for log items per day bar chart.
   */
  public accessDeniedLabels: Label[] = [];

  /**
   * Dataset for log items per day bar chart.
   */
  public accessDeniedData: SingleDataSet = null;

  /**
   * Colors for log items per day bar chart.
   */
  public accessDeniedColors = [{
    backgroundColor: [
      'rgba(200,200,200,0.6)',
      'rgba(190,190,190,0.6)',
      'rgba(180,180,180,0.6)',
      'rgba(170,170,170,0.6)',
      'rgba(160,160,160,0.6)',
      'rgba(150,150,150,0.6)',
      'rgba(140,140,140,0.6)',
      'rgba(130,130,130,0.6)',
      'rgba(120,120,120,0.6)',
      'rgba(110,110,110,0.6)',
      'rgba(100,100,100,0.6)',
      'rgba(90,90,90,0.6)',
      'rgba(80,80,80,0.6)',
      'rgba(70,70,70,0.6)',
    ]}];

  /**
   * Creates an instance of your component.
   * 
   * @param logService Needed to retrieve LOC statistics
   * @param userService Needed to count users in installation
   */
  constructor(
    private logService: LogService,
    private userService: UserService,
    private roleService: RoleService,
    private taskService: TaskService,
    private authService: AuthService,
    private feedbackService: FeedbackService) { }

  /**
   * Implementation of OnInit.
   */
  public ngOnInit() {

    // Counting users in installation.
    this.userService.count().subscribe((count: Count) => {
      this.userCount = count.count;
    }, (error: any) => this.feedbackService.showError(error));

    // Counting roles in installation.
    this.roleService.count().subscribe((count: Count) => {
      this.roleCount = count.count;
    }, (error: any) => this.feedbackService.showError(error));

    // Counting log items in installation.
    this.logService.count().subscribe((count: Count) => {
      this.logCount = count.count;
    }, (error: any) => this.feedbackService.showError(error));

    // Retrieving oldest log item in installation.
    this.logService.get(1).subscribe((logItem: LogItem) => {
      this.age = new Date(logItem.created);
    }, (error: any) => this.feedbackService.showError(error));

    // Retrieving LOC statistics.
    this.logService.getLoc().subscribe((res: any) => {
      this.locData = [res.backend, res.frontend];
      this.loc = res.backend + res.frontend;
    });

    // Retrieving log items per day type of statistics.
    this.logService.statisticsDays().subscribe((res: any[]) => {
      this.daysData = res.map(x => x.count);
      this.daysLabels = res.map(x => moment(new Date(x.date)).format("D. MMM"));
    });

    // Retrieving logins per day type of statistics.
    this.logService.statisticsDays('We successfully authenticated user \'').subscribe((res: any[]) => {
      this.loginData = res.map(x => x.count);
      this.loginLabels = res.map(x => moment(new Date(x.date)).format("D. MMM"));
    });

    // Retrieving failed logins per day type of statistics.
    this.logService.statisticsDays('Unhandled exception occurred \'Access denied\' at \'/magic/modules/system/auth/authenticate\'').subscribe((res: any[]) => {
      this.failedLoginData = res.map(x => x.count);
      this.failedLoginLabels = res.map(x => moment(new Date(x.date)).format("D. MMM"));
    });

    // Retrieving access denied per day type of statistics.
    this.logService.statisticsDays('Unhandled exception occurred \'Access denied\' at ').subscribe((res: any[]) => {
      this.accessDeniedData = res.map(x => x.count);
      this.accessDeniedLabels = res.map(x => moment(new Date(x.date)).format("D. MMM"));
    });

    // Retrieving log items per type from backend.
    this.logService.statisticsType().subscribe((res: any[]) => {
      this.logTypeLabels = res.map(x => x.type);
      this.logTypeData = res.map(x => x.count);
      this.errors = 0;
      for (const idx of res) {
        if (idx.type === 'error' || idx.type === 'fatal') {
          this.errors += idx.count;
        }
      }
    });

    // Counting tasks in system.
    this.taskService.count().subscribe((count: Count) => {
      this.taskCount = count.count;
    });

    // Counting endpoints in system.
    this.authService.getEndpoints().subscribe((endpoints: Endpoint[]) => {
      this.endpoints = endpoints.length;
    });
  }
}
