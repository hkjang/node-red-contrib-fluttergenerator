import 'package:drift_pilot_app/models/request/{{name_sn}}_request.dart';
import 'package:drift_pilot_app/models/response/{{name_sn}}_response.dart';
import 'package:drift_pilot_app/repository/{{name_sn}}_repository.dart';
import 'package:flutter/material.dart';
import 'package:rxdart/rxdart.dart';
import 'base_bloc.dart';

class {{name_pc}}Bloc extends BaseBloc {
  final _on{{name_pc}}SuccessBS = BehaviorSubject<dynamic>();
  final _on{{name_pc}}UpdateSuccessBS = BehaviorSubject<dynamic>();
  SearchRepository _{{name_cc}}Repository;

  Stream<dynamic> get on{{name_pc}}SuccessBS => _on{{name_pc}}SuccessBS.stream;
  Stream<dynamic> get on{{name_pc}}UpdateSuccessBS => _on{{name_pc}}UpdateSuccessBS.stream;

  {{name_pc}}Bloc(BuildContext context) {
    onInit(context);
  }

  @override
  void onInit(BuildContext context) {
    _{{name_cc}}Repository = {{name_pc}}Repository(context);
  }

  @override
  void onDispose() {
    compositeSubscription.clear();
    _on{{name_pc}}SuccessBS.close();
    _on{{name_pc}}UpdateSuccessBS.close();
  }

  void requestGet{{name_pc}}() {
    isLoadingBS.add(true);
    compositeSubscription.add(_{{name_cc}}Repository
        .get{{name_pc}}()
        .listen(({{name_cc}}Response) {
      isLoadingBS.add(false);
      if ({{name_cc}}Response
          is {{name_pc}}Response) {
        _on{{name_pc}}SuccessBS.add({{name_cc}}Response);
      } else
        onErrorBS.add({{name_cc}}Response);
    }));
  }

  void requestUpdate{{name_pc}}(
      {{name_pc}}Request {{name_cc}}Request) {
    isLoadingBS.add(true);
    compositeSubscription.add(_{{name_cc}}Repository
        .update{{name_pc}}({{name_cc}}Request)
        .listen(({{name_cc}}UpdateResponse) {
      isLoadingBS.add(false);
      if ({{name_cc}}UpdateResponse is {{name_pc}}UpdateResponse) {
        _on{{name_pc}}SuccessBS.add({{name_cc}}UpdateResponse);
      } else
        onErrorBS.add({{name_cc}}UpdateResponse);
    }));
  }
}
