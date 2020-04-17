/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        // $('ons-splitter').after('<ons-modal id="loading-modal-global" direction="up" style="background-color: rgba(242, 242, 242, .99);" ><div style="text-align: center"> <ons-progress-circular class="" indeterminate></ons-progress-circular></div><div style="color:red;"> loading...</div></ons-modal>');
        // loading = document.querySelector('#loading-modal-global');
        // loading.show();
        // setTimeout(() => {
        //     startApp.init();
        // }, 200);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {


        $('ons-splitter').after('<ons-modal id="loading-modal-global" direction="up" style="background-color: rgba(242, 242, 242, .99);" ><div style="text-align: center"> <ons-progress-circular class="" indeterminate></ons-progress-circular></div><div style="color:#02b3f1;"> loading...</div></ons-modal>');
        loading = document.querySelector('#loading-modal-global');
        loading.show();
        setTimeout(() => {
            startApp.init();
        }, 2200);
    }


};