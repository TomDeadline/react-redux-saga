import {
	takeLatest,
	takeEvery,
	call,
	put,
	fork,
	all,
	select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import axios from 'axios';

function fetchDog() {
	return axios({
		method: "get",
		url: "https://dog.ceo/api/breeds/image/random"
	});
}

function* dogWorker() {
	try {
		const response = yield call(fetchDog);
		const dog = response.data.message;

		yield put({ type: "API_CALL_SUCCESS", dog });

	} catch (error) {
		yield put({ type: "API_CALL_FAILURE", error });
	}
}

export function* dogWatcher() {
	yield takeLatest("API_CALL_REQUEST", dogWorker);
}


function* incrementWorker() {
	try {
		yield delay(4000);

		const counter = yield select( store => store.counter );

		yield put({ type: "INCREMENT_SUCCESS", counter: counter + 1 });

	} catch (error) {
		yield put({ type: "INCREMENT_FAILURE", error });
	}
}

export function* incrementWatcher() {
	yield takeEvery("INCREMENT_REQUEST", incrementWorker);
}


export function* watcherSaga() {

	yield all([
		fork(dogWatcher),
		fork(incrementWatcher),
	]);

}
